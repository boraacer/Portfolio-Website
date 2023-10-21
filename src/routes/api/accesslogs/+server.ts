import type { RequestHandler } from './$types';
import pkg from 'pg';
const { Pool } = pkg;
import fs from 'fs';
import path from 'path';

const configPath = path.resolve(process.cwd(), 'databaseConfig.json');
const rawConfig = fs.readFileSync(configPath, 'utf-8');
const dbConfig = JSON.parse(rawConfig);

const pool = new Pool(dbConfig);

function isValidIPv4(ip: string): boolean {
	const pattern =
		/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
	return pattern.test(ip);
}

interface IPInfoResponse {
	ip: string;
	city: string;
	region: string;
	country: string;
	loc: string; // Latitude and Longitude
	org: string; // Organization/ISP
}

interface LocationData {
	city: string;
	region: string;
	country: string;
	loc: string; // Latitude and Longitude
	org: string; // Organization/ISP
}

function removeIP(data: IPInfoResponse): LocationData {
	const { ip, ...rest } = data;
	return rest;
}

async function getIPLocationAndISP(ip: string = ''): Promise<LocationData> {
	const endpoint = ip ? `https://ipinfo.io/${ip}/json` : `https://ipinfo.io/json`;

	try {
		const response = await fetch(endpoint);
		if (response.ok) {
			const data = (await response.json()) as IPInfoResponse;
			return removeIP(data);
		} else {
			throw new Error('Failed to fetch IP details');
		}
	} catch (error) {
		console.error('Error fetching IP details:', error);
		throw error;
	}
}

export const POST: RequestHandler = async (event) => {
	try {
		const requestBody = await event.request.json();

		const client = await pool.connect();

		const ip_address = requestBody['ip_address'] || 'unknown';

        if (!isValidIPv4(ip_address)) {
            return new Response('Invalid IP address', { status: 400 });
        }

		const user_agent = event.request.headers.get('User-Agent');
		const time_accessed = new Date().toISOString();
		const location = await getIPLocationAndISP(ip_address);
		const isp = location.org;

		await client.query(
			'INSERT INTO access_logs (ip_address, time_accessed, user_agent, location, isp) VALUES ($1, $2, $3, $4, $5)',
			[ip_address, time_accessed, user_agent, location, isp]
		);

		client.release();

		return new Response(null, { status: 200 });
	} catch (err) {
		console.error(err);
		return new Response('Database error', { status: 500 });
	}
};
