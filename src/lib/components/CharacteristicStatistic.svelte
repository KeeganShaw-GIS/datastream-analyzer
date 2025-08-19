<script lang="ts">
	import * as Card from '$lib/components/ui/card/index';
	import type { Datastream } from '$lib/schema/datastream';
	import type { StatisticType } from '$lib/schema/statistics';
	type ComponentProps = {
		data: Datastream[];
		statisticType: StatisticType;
	};
	let { data, statisticType }: ComponentProps = $props();
	// Should move out into a seperate file
	function getMethod(methodType: StatisticType) {
		return (data: Datastream[]) => {
			if (data.length === 0) return 0;
			const sum = data.reduce((acc, cur) => acc + (cur.ResultValue || 0), 0);
			return sum / data.length;
		};
	}
	const statisticValue = $derived(data.length > 0 ? getMethod(statisticType)(data) : '-');
	const statisticUnit = $derived(data.length > 0 ? data[0].ResultUnit : '-');
</script>

<div class="w-full flex gap-4">
	<Card.Root class="@container/card flex-1">
		<Card.Header>
			<Card.Description>Count</Card.Description>
			<Card.Title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
				{`${data.length} records`}
			</Card.Title>
		</Card.Header>
	</Card.Root>

	<Card.Root class="@container/card flex-1">
		<Card.Header>
			<Card.Description>Average</Card.Description>
			<Card.Title class="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
				{`${statisticValue.toLocaleString(undefined, {
					minimumFractionDigits: 0,
					maximumFractionDigits: 3
				})} ${statisticUnit || ''}`}
			</Card.Title>
		</Card.Header>
	</Card.Root>
</div>
