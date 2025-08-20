<script lang="ts">
	import { Input } from '$lib/components/ui/input/index.js';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { streamParseCsv } from '$lib/utils/open-parse-csv';
	import { datastreamSchema, type Datastream } from '$lib/schema/datastream';
	import type { ImportStatus } from '../../routes/data-viewer/schema';

	type ComponentProps = { setImportedData: (data: Datastream[]) => void };

	let files: FileList | null | undefined = $state();
	let importStatus: ImportStatus | undefined = $state();
	let { setImportedData }: ComponentProps = $props();
	function handleChange(event: Event) {
		const input = event.target as HTMLInputElement;
		files = input.files;
	}

	async function handleSubmit(event: Event) {
		event.preventDefault();
		const file = files?.[0];
		if (!file) {
			importStatus = { message: 'No File Selected', status: 'ERROR' };
			return;
		}
		const parsedCsv = await streamParseCsv(file, datastreamSchema);

		const message = `imported ${parsedCsv.records.length} records; ${parsedCsv.errors.length} errors`;
		importStatus = {
			status: parsedCsv.errors.length === 0 ? 'SUCCESS' : 'ERROR',
			filename: file.name,
			message,
			rowErrors: parsedCsv.errors
		};
		setImportedData(parsedCsv.records);
	}
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'secondary', size: 'lg' })}
		>Import Data</Dialog.Trigger
	>
	<Dialog.Content class="sm:max-w-[600px]">
		<Dialog.Header>
			<Dialog.Title>Import Datastream data</Dialog.Title>
			<Dialog.Description>
				Download data from <a href="https://datastream.org/en-ca/"> Here</a>
			</Dialog.Description>
		</Dialog.Header>
		<form method="post" enctype="multipart/form-data" onsubmit={handleSubmit}>
			<div>
				{#if importStatus?.status === 'SUCCESS'}
					<p style="color: green">{importStatus.message}</p>
				{:else}
					<p style="color: red">{importStatus?.message}</p>
				{/if}
				<Input type="file" name="file" accept="text/csv" onchange={handleChange} />
			</div>
			<Dialog.Footer>
				<Button type="submit" disabled={!files}>Upload</Button>
			</Dialog.Footer>
		</form>
	</Dialog.Content>
</Dialog.Root>
