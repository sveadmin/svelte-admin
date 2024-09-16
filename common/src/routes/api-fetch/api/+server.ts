import { json } from '@sveltejs/kit';

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms))
}

export async function GET() {
	const number = Math.floor(Math.random() * 900) + 300;

	await timeout(number);

	return json(number);
}