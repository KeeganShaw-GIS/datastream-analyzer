<script lang="ts">
	import { datastreamColumns } from './data-columns';
	import CsvImportModal from '$lib/components/CsvImportModal.svelte';
	import { type Datastream } from '$lib/schema/datastream.js';
	import DataTable from '$lib/components/DataTable.svelte';
	import { getUniqueValues } from '$lib/utils/get-unique-vals';
	import LocationSelector from '$lib/components/LocationSelector.svelte';
	import CharacteristicSelector from '$lib/components/CharacteristicSelector.svelte';
	import CharacteristicStatistic from '$lib/components/CharacteristicStatistic.svelte';

	let importedRecords: Datastream[] | undefined = $state();
	let selectedLocationId: string | undefined = $state();
	let selectedCharacteristic: string | undefined = $state("Temperature, water");

	const monitoringlocationIds = $derived(
		getUniqueValues(importedRecords || [], 'MonitoringLocationID') as string[]
	);

	const characteristics = $derived(
		getUniqueValues(importedRecords || [], 'CharacteristicName') as string[]
	);

	const recordsToDisplay = $derived(
		importedRecords
			?.filter(
				(r) =>
					r.MonitoringLocationID === selectedLocationId &&
					r.CharacteristicName === selectedCharacteristic
			)
			// Sort Decending on value (should build into table)
			.sort((a, b) => Number(b.ResultValue) - Number(a.ResultValue))
	);

	function handleLocationSelect(selected: string) {
		selectedLocationId = selected;
	}

	function handleCharacteristicSelect(selected: string) {
		selectedCharacteristic = selected;
	}
	function setImportedData(data: Datastream[]) {
		// This is probably not desired but cleans up prototype logic
		importedRecords = data.filter((row) => row.ResultValue !== undefined);
		if (data.length > 0) {
			selectedLocationId = importedRecords[0].MonitoringLocationID;
		}
	}
</script>

<div class="flex h-screen w-full flex-col">
	<!-- Top bar -->
	<header class="flex items-center bg-gray-900 px-4 py-2 text-white shadow-md">
		<h1 class="flex-1 text-lg font-semibold">Datastream Dashboard</h1>
		<CsvImportModal {setImportedData} />
	</header>

	<!-- Main content -->
	<main class="flex-1 flex-col overflow-auto">
		{#if importedRecords}
			<section class="border-b bg-gray-100 p-4">
				<div class="flex rounded-xl bg-white p-4 shadow">
					<div class="flex-1 px-4">
						<LocationSelector
							selectOptions={monitoringlocationIds}
							selected={selectedLocationId}
							onSelect={handleLocationSelect}
						/>
					</div>
					<div class="flex-1 px-4">
						<CharacteristicSelector
							selectOptions={characteristics}
							selected={selectedCharacteristic}
							onSelect={handleCharacteristicSelect}
						/>
					</div>
				</div>
			</section>
			<section class="border-b bg-gray-100 p-4">
				<h2 class="mb-2 text-xl font-semibold">Statistics</h2>
				<div class="flex rounded-xl bg-white p-4 shadow">
					<div class="flex-1 px-4">
						<CharacteristicStatistic data={recordsToDisplay || []} statisticType="AVERAGE" />
					</div>
				</div>
			</section>

			<!-- Raw data -->
			<section class="p-4">
				<h2 class="mb-2 text-xl font-semibold">
					Raw Data — {selectedLocationId || 'All'}
					({(recordsToDisplay || []).length} records)
				</h2>
				<div class="rounded-xl bg-white p-2 shadow">
					<DataTable data={recordsToDisplay || []} columns={datastreamColumns} />
				</div>
			</section>
		{:else}
			<section class="flex h-1/2 items-center justify-center">
				<p class="text-lg font-semibold">Please import data</p>
			</section>
		{/if}
	</main>
</div>
