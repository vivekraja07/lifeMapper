<template>        
    <table>
        <thead>
            <tr>
                <th v-for="(col, index) in Table.columns" :key="index">
                    {{col}}
                </th>
            </tr>
        </thead>
        <tbody>
        <tr v-for="(row, index) in Table.rows" :key="index">
            <td v-for="(key, index) in row" :key="index">
                {{key}}
            </td>
        </tr>
        </tbody>
    </table>

</template>

<script>

export default {
  name: 'Table',
  props: {
    Table: Object,
  }
}
</script>

<style scoped>

/* table styles */
table {
    text-align: left;
    width: 100%;
    border-collapse: collapse;
    border-radius: var(--radius, 12px);
    overflow: hidden;
    font-size: 0.875rem;
    box-shadow: var(--shadow-sm, 0 1px 2px rgba(15, 23, 42, 0.06));
    border: var(--border-section-width, 3px) solid var(--color-border, #e2e8f0);
}

thead {
  background: var(--color-chrome, #0f172a);
  color: #f8fafc;
}

th {
    padding: 0.65rem 0.75rem;
    font-weight: 600;
    font-size: 0.8125rem;
    letter-spacing: 0.02em;
}

tbody tr:nth-child(even) {
  background: rgba(14, 165, 233, 0.06);
}

td {
    padding: 0.5rem 0.75rem;
    border-top: var(--border-section-width, 3px) solid var(--color-border, #e2e8f0);
}

</style>

