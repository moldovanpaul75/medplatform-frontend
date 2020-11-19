import React from "react";
import Table from "../tables/table";


class TableForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData,
            tableColumns: this.props.tableColumns,
            tableFilter: this.props.tableFilter
        };
    }

    render(){
        return (
            <Table
                data={this.state.tableData}
                columns={this.state.tableColumns}
                search={this.state.tableFilter}
                pageSize={5}
            />
        )
    }
}

export default TableForm;