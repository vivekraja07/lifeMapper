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
    text-align: center;
    border: 1px solid;
}

th {
    border-bottom: 1px solid;
}

</style>

