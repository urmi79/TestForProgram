import React, { Component } from "react";
import { Table, Button, Popconfirm, Row,Col, Upload } from "antd";
import { ExcelRenderer } from "react-excel-renderer";
import { EditableFormRow, EditableCell } from "../utils/editutl";

export default class excelcom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cols: [],
      rows: [],
      errorMessage: null,
      //Rendering excel field value
      columns: [
        {
            title: "SlNo.",
            dataIndex: "SNo",
            editable: true
          },
        {
          title: "Company",
          dataIndex: "Company",
          editable: true
        },
        {
          title: "Sector",
          dataIndex: "Sector",
          editable: true
        },
        {
          title: "Sub-Sector",
          dataIndex: "SubSector",
          editable: true
        },
        {
            title: "Region",
            dataIndex: "Region",
            editable: true
          },
          {
            title: "No. ofEmployees",
            dataIndex: "NoofEmployees",
            editable: true
          },
          {
            title: "Total Revenues",
            dataIndex: "TotalRevenues",
            editable: true
          },
          {
            title: "Websites",
            dataIndex: "Websites",
            editable: true
          },
        {
          title: "Action",
          dataIndex: "action",
          render: (text, record) =>
            this.state.rows.length >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(record.key)}
              >
                <button>delete</button>
            </Popconfirm>
            ) : null
        }
      ]
    }
  }

  handleSave = row => {
    const newData = [...this.state.rows];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ rows: newData });
  };

  checkFile(file) {
    let errorMessage = "";
    if (!file || !file[0]) {
      return;
    }
    const isExcel =
      file[0].type === "application/vnd.ms-excel" ||
      file[0].type ===
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    if (!isExcel) {
      errorMessage = "You can only upload Excel file!";
    }
    console.log("file", file[0].type);
    const isLt2M = file[0].size / 1024 / 1024 < 2;
    if (!isLt2M) {
      errorMessage = "File must be smaller than 2MB!";
    }
    console.log("errorMessage", errorMessage);
    return errorMessage;
  }

  fileHandler = fileList => {
    console.log("fileList", fileList);
    let fileObj = fileList;
    if (!fileObj) {
      this.setState({
        errorMessage: "No file uploaded!"
      });
      return false;
    }
    console.log("fileObj.type:", fileObj.type);
    if (
      !(
        fileObj.type === "application/vnd.ms-excel" ||
        fileObj.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      )
    ) {
      this.setState({
        errorMessage: "Unknown file format. Only Excel files are uploaded!"
      });
      return false;
    }
    //just pass the fileObj as parameter
    ExcelRenderer(fileObj, (err, resp) => {
      if (err) {
        console.log(err);
      } else {
        let newRows = [];
        resp.rows.slice(1).map((row, index) => {
          if (row && row !== "undefined") {
            newRows.push({
              key: index,
              SNo: row[0],
              Company: row[1],
              Sector: row[2],
              SubSector: row[3],
              Region: row[4],
              NoofEmployees: row[5],
              TotalRevenues: row[6],
              Websites: row[7],
              action: row[8]
            });
          }
        });
        if (newRows.length === 0) {
          this.setState({
            errorMessage: "No data found in file!"
          });
          return false;
        } else {
          this.setState({
            cols: resp.cols,
            rows: newRows,
            errorMessage: null
          });
        }
      }
    });
    return false;
  };
//Submit data
  handleSubmit = async () => {
    console.log("submitting: ", this.state.rows);
    const newData = [...this.state.rows];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row
    });
    this.setState({ rows: [newData, ...rows]})
  };
//Delete data
  handleDelete = key => {
    const rows = [...this.state.rows];
    this.setState({ rows: rows.filter(item => item.key !== key) });
  };
  //Adding new record
  handleAdd = () => {
    const { count, rows } = this.state;
    const newData = {
      key: count,
      
      SNo: "6",
      Company: "test",
      Sector: "test",
      SubSector: "test",
      Region: "test",
      NoofEmployees: "test",
      TotalRevenues: "test",
      Websites: "test",
     
    };
    this.setState({
      rows: [newData, ...rows],
      count: count + 1,
      SNo: count+1,
      Company: row[1],
      Sector: row[2],
      SubSector: row[3],
      Region: row[4],
      NoofEmployees: row[5],
      TotalRevenues: row[6],
      Websites: row[7],
      action: row[8]
    });
  };

  render() {
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell
      }
    };
    const columns = this.state.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave
        })
      };
    });
    return (
      <>
        <h1>Importing Excel Component</h1>
        <Row gutter={16}>
          <Col
            span={8}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "5%"
            }}
          >
            
          </Col>
          <Col span={8}>
            <a
              href="F:\TestforProgram\Sample Data"
              target="_blank"
              rel="F:\TestforProgram\Sample Data"
              download
            >
              Sample excel sheet
            </a>
          </Col>
          <Col
            span={8}
            align="right"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            {this.state.rows.length > 0 && (
              <>
                <Button
                  onClick={this.handleAdd}
                  size="large"
                  type="info"
                  style={{ marginBottom: 16 }}
                >
                  
                  Add a row
                </Button>{" "}
                <Button
                  onClick={this.handleSubmit}
                  size="large"
                  type="primary"
                  style={{ marginBottom: 16, marginLeft: 10 }}
                >
                  Submit Data
                </Button>
              </>
            )}
          </Col>
        </Row>
        <div>
          <Upload
            name="file"
            beforeUpload={this.fileHandler}
            onRemove={() => this.setState({ rows: [] })}
            multiple={false}
          >
            <Button>
              Click to Upload Excel File
            </Button>
          </Upload>
        </div>
        <div style={{ marginTop: 20 }}>
          <Table
            components={components}
            rowClassName={() => "editable-row"}
            dataSource={this.state.rows}
            columns={columns}
          />
        </div>
      </>
       );
      }
    }
    