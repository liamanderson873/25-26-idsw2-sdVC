import React from 'react';
import styles from './DataTable.module.css';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
}

function DataTable<T extends { id?: number }>({ data, columns, isLoading, onEdit, onDelete }: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Cargando datos...</p>
      </div>
    );
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead className={styles.thead}>
          <tr>
            {columns.map((col, idx) => (
              <th key={idx} className={styles.th}>{col.header}</th>
            ))}
            {(onEdit || onDelete) && <th className={styles.th} style={{ textAlign: 'center' }}>Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + (onEdit || onDelete ? 1 : 0)} className={styles.empty}>
                No hay registros disponibles.
              </td>
            </tr>
          ) : (
            data.map((item, rowIdx) => (
              <tr key={item.id || rowIdx} className={styles.tr}>
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className={styles.td}>
                    {typeof col.accessor === 'function' 
                      ? col.accessor(item) 
                      : (item[col.accessor] as React.ReactNode)}
                  </td>
                ))}
                {(onEdit || onDelete) && (
                  <td className={styles.td} style={{ textAlign: 'center' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                      {onEdit && (
                        <button 
                          onClick={() => onEdit(item)}
                          style={{ padding: '0.4rem', background: '#eff6ff', color: 'var(--primary)', border: '1px solid #dbeafe', borderRadius: '6px' }}
                          title="Editar"
                        >
                          ✎
                        </button>
                      )}
                      {onDelete && (
                        <button 
                          onClick={() => {
                            if (window.confirm('¿Estás seguro de eliminar este registro?')) {
                              onDelete(item);
                            }
                          }}
                          style={{ padding: '0.4rem', background: '#fef2f2', color: 'var(--danger)', border: '1px solid #fee2e2', borderRadius: '6px' }}
                          title="Eliminar"
                        >
                          ✖
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
