<script lang="ts">
	import * as Select from '$lib/components/ui/select/index';
	import Label from './ui/label/label.svelte';
	type ComponentProps = {
		selectOptions: string[];
		selected?: string;
		onSelect: (selected: string) => void;
	};
	let { selectOptions, selected, onSelect }: ComponentProps = $props();
</script>

<div class="w-full">
	<Label class="pb-2" for="monIdLoc">Select Characteristic</Label>
	<Select.Root name="monIdLoc" type="single" onValueChange={(value) => onSelect(value)}>
		<Select.Trigger class="w-full">{selected}</Select.Trigger>
		<Select.Content class="w-full">
			{#each selectOptions as option (option)}
				<Select.Item value={option}>{option}</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>
