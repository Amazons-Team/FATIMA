import React from 'react';

interface ResponsiveTableProps {
  headers: string[];
  data: any[];
  renderRow: (item: any, index: number) => React.ReactNode;
  renderMobileCard?: (item: any, index: number) => React.ReactNode;
  emptyMessage?: string;
  className?: string;
}

const ResponsiveTable: React.FC<ResponsiveTableProps> = ({
  headers,
  data,
  renderRow,
  renderMobileCard,
  emptyMessage = 'لا توجد بيانات',
  className = '',
}) => {
  if (data.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Desktop Table View */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              {headers.map((header, index) => (
                <th key={index} className="border p-2 text-right">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => renderRow(item, index))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden">
        {renderMobileCard ? (
          data.map((item, index) => renderMobileCard(item, index))
        ) : (
          data.map((item, index) => (
            <div key={index} className="responsive-table-card mb-4">
              {Object.keys(item).map((key, keyIndex) => {
                // Skip rendering certain fields that might be IDs or not relevant for display
                if (key === 'id' || key === 'createdAt' || key === 'updatedAt') return null;
                
                return (
                  <div key={keyIndex} className="responsive-table-card-row">
                    <span className="responsive-table-card-label">
                      {headers[keyIndex] || key}:
                    </span>
                    <span>{String(item[key])}</span>
                  </div>
                );
              })}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ResponsiveTable;
