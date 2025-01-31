<script lang="ts">
	import { onMount } from 'svelte';
	import type { Incident, Severity } from '$lib/types';

	let incidents: Incident[] = [];
	let incidentId: number = 0;

	const services: string[] = ['Database', 'API Gateway', 'Cache', 'Load Balancer', 'Auth Service'];
	const severities: Severity[] = ['sev1', 'sev2', 'sev3'];

	// Generate a new random incident
	function generateIncident(): void {
		const service: string = services[Math.floor(Math.random() * services.length)];
		const severity: Severity = severities[Math.floor(Math.random() * severities.length)];

		const incident: Incident = {
			id: incidentId++,
			service,
			severity,
			message: `${service} is experiencing issues!`,
			startedAt: new Date().toLocaleTimeString(),
			resolved: false
		};

		incidents = [...incidents, incident];
		console.log(`🚨 New Incident: ${service} - ${severity}`);
	}

	// Resolve an incident
	function resolveIncident(id: number): void {
		incidents = incidents.map((incident) =>
			incident.id === id ? { ...incident, resolved: true } : incident
		);
		console.log(`✅ Resolved Incident: ID ${id}`);
	}

	onMount(() => {
		// Generate incidents every 10-15 seconds randomly
		setInterval(
			() => {
				if (Math.random() < 0.5) {
					generateIncident();
				}
			},
			Math.random() * (15000 - 10000) + 10000
		);
	});
</script>

<h1>🚀 On-Call Engineer Simulator</h1>
<p>This is the incident, can you see it?</p>

<ul>
	{#each incidents as incident (incident.id)}
		<li class={incident.resolved ? '' : 'alert'}>
			<strong>{incident.service}</strong> - {incident.severity}
			{incident.resolved ? '✅ Resolved' : '🚨 Ongoing'}
			{#if !incident.resolved}
				<button on:click={() => resolveIncident(incident.id)}>Fix</button>
			{/if}
		</li>
	{/each}
</ul>

<style>
	.alert {
		animation: flash 1s infinite alternate;
		color: red;
		font-weight: bold;
	}

	@keyframes flash {
		from {
			color: red;
		}
		to {
			color: yellow;
		}
	}
</style>
