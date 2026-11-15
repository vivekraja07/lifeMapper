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
    Table: Object
  }
}
</script>

<style scoped>
table {
  width: 100%;
  text-align: left;
  border-collapse: separate;
  border-spacing: 0;
  font-size: 0.85rem;
  border: 1px solid var(--color-border, #e2e8f0);
  border-radius: 10px;
  overflow: hidden;
}

th {
  padding: 0.55rem 0.8rem;
  background: #f8fafc;
  border-bottom: 1px solid var(--color-border, #e2e8f0);
  font-size: 0.6875rem;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--color-muted, #64748b);
}

td {
  padding: 0.5rem 0.8rem;
  color: #334155;
  border-top: 1px solid #f1f5f9;
}

tbody tr:first-child td {
  border-top: 0;
}

tbody tr:hover td {
  background: #f8fafc;
}

/* First column is a code/number: keep it quiet and narrow */
td:first-child {
  white-space: nowrap;
  font-variant-numeric: tabular-nums;
  color: var(--color-muted, #64748b);
}
</style>
