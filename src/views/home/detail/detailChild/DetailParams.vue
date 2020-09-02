<template>
  <div
    class="params"
    v-if="Object.keys(itemParams).length != 0"
  >
    <table>
      <tr
        v-for="(item, index) in itemParams.rule.tables[0]"
        :key="index"
      >
        <td
          v-for="(i, cindex) in item"
          :key="cindex"
        > {{ i }} </td>
      </tr>
    </table>

    <table>
      <tr
        v-for="(item, index) in itemParams.info.set"
        :key="index"
      >
        <td class="td-key"> {{ item.key }} </td>
        <td class="td-val"> {{ item.value }} </td>
      </tr>
    </table>
    <div class="disclaimer">
      {{ itemParams.rule.disclaimer }}
    </div>
  </div>
</template>

<script>

export default {
  components: {},
  props: {
    itemParams: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {

    };
  },
  methods: {

  }
}
</script>

<style scoped>
.params {
  background-color: #fff;
}
table {
  width: 100%;
}
table tr {
  display: flex;
  border-bottom: 1px solid #ccc;
  padding: 10px 5px;
}
tr td {
  flex: 1;
}
tr .td-key {
  flex: 2;
}
tr .td-val {
  color: var(--color-tint);
  flex: 8;
}
.disclaimer {
  margin-top: 10px;
  color: #666;
}
</style>