import { Column, ColumnType } from '@/types'

export function ColumnsByType(columns: Column) {
  const columnTypes: ColumnType[] = ['todo', 'done', 'inprogess']

  columnTypes.forEach(columnType => {
    if (!columns.get(columnType)) {
      columns.set(columnType, {
        H
      })
    }
  })
}
