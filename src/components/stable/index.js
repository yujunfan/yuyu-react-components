import React from 'react';
import { Table, Tooltip } from 'antd';
const STable = ({ data, search, columns, loading, bordered = true, type,title,itemIndex }) => {
    const pagination = {
        pageSize: 10,
        current: data.page,
        showTotal: (total, range) => {
            return '共' + data.totalElements + '条'
        },
        showLessItems: true,
        total: data.totalElements,
        showSizeChanger: false,
        showQuickJumper: true,
        onChange: (page, pageSize) => {
            search(
                {
                    page: page,
                    size: pageSize
                }
            )
        }
    }
   const newColumns = columns.map(item => {
        if (item.render)
            return item;
        return {
            ...item,
            ellipsis: {
                showTitle: false,
            },
            render: address => (
                <Tooltip placement="topLeft" title={address}>
                    {address}
                </Tooltip>
            )
        }
    })

    const expandedRowRender = (data) => {
        return <Table  rowKey={record => record.recordId + ProduceKey()} columns={expandColumns} dataSource={data} pagination={false}  />;
    };
    const typeDom = () => {
        switch (type) {
            case 'detail':
                return <Table
                    rowKey={record => record.id}
                    columns={newColumns}
                    dataSource={data}
                    title={() => title}
                    pagination={false}
                    bordered
                />
            case 'expand':
                return  <div id="table" className="tableLayout">
                <Table
                    loading={loading}
                    rowKey={record => record.id}
                    columns={newColumns}
                    pagination={hidePagination? false: pagination}
                    expandedRowRender={record => expandedRowRender(record[itemIndex])}
                    dataSource={data}
                    bordered
                />
             </div>
             default:
                 return  <div id="table" className="tableLayout">
                 <Table
                     loading={loading}
                     pagination={pagination}
                     rowKey={record => record.id}
                     columns={newColumns}
                     dataSource={data.list}
                     bordered={bordered}
                 />
             </div>
        }
    }
    return (
        typeDom()
    )
}
export default STable;