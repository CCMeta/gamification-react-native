import React, { PropTypes } from 'react'
import {connect} from 'react-redux';
import { Row, Col, Input, Table, Icon} from 'antd';
import { Modal, Button } from 'antd';
import { Form, Slider, InputNumber, Select, DatePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const OptGroup = Select.OptGroup;

import * as actions from '../actions/actionsCreators.jsx';
import DataGridComponent from '../components/DataGridComponent.jsx'

const ScheduleContainer = React.createClass({
  mixins: [Form.ValueMixin],
  getInitialState() {
    //数据驱动！！
    //head高度与dataGrid的高度定义
    let height = document.body.offsetHeight
    let headerHeight = height * 0.2 +"px";
    let dataGridHeight = parseInt(height * 0.7) +"px";

    let start_at;
    start_at = (new Date()).getFullYear() + "-"
    start_at += (new Date()).getMonth() + 1 + "-"
    start_at += (new Date()).getDate() + 1
    return {
        headerHeight,
        dataGridHeight,
        editModalVisible: false,
        editModalLoading: false,
        formData: {
          text: '',
          note: '',
          exp: 0,
          gold: 0,
          repeat_type: 1,
          alert_at: '',
          start_at
        }
     };
  },
  handleScheduleClick (schedule) {
    this.setState({
      editModalVisible: true,
      formData: {
        ...schedule,
        repeat_type: schedule.repeat_type.toString()
      }
    });
  },
  handleOk() {
    let formData = this.state.formData;
    let schedule = {
      id: formData.id,
      text: formData.text,
      repeat_type: formData.repeat_type,
      start_at: formData.start_at
    };
    if(formData.note){
      schedule.note = formData.note;
    }
    if(formData.exp){
      schedule.exp = formData.exp;
    }
    if(formData.gold){
      schedule.gold = formData.gold;
    }
    if(formData.alert_at){
      schedule.alert_at = formData.alert_at;
    }
    this.props.onFetchEditSchedule(schedule);
    this.setState({ editModalLoading: true });
    setTimeout(() => {
      this.setState({ editModalLoading: false, editModalVisible: false });
    }, 1000);
  },
  handleCancel() {
    this.setState({
      editModalVisible: false
    });
  },
  handleStartAtChange(value) {
    let result = value || new Date();
    let start_at = '';
    start_at += result.getFullYear() + "-"
    start_at += (result.getMonth() + 1) + "-"
    start_at += result.getDate()
    this.setState({
      formData: {
        ...this.state.formData,
        start_at
      }
    });
  },
  handleAlertAtChange(value) {
    let result = value || new Date();
    let alert_at = '';
    alert_at += result.getFullYear() + "-"
    alert_at += (result.getMonth() + 1) + "-"
    alert_at += result.getDate() + " "
    alert_at += result.getHours() + ":"
    alert_at += result.getMinutes() + ":00"
    this.setState({
      formData: {...this.state.formData,
        alert_at
      }
    })
  },
    render () {
      const columns = [{
          colSpan: 0,
          title: '任务文本',
          dataIndex: 'text',
          render: (text, schedule) => {
            return (
              <Row>
                <Col span="16">
                  <a
                    href="javascript:;"
                    onClick={() => this.handleScheduleClick(schedule)}>
                    {text}
                  </a>
                </Col>
                <Col span="2" style={{color:"#5E30B5"}}>
                  <Icon type="star-o" /> {schedule.exp}
                </Col>
                <Col span="2" style={{color:"#FF6100"}}>
                  $ {schedule.gold}
                </Col>
                <Col span="2" style={{color:"#01BAD2"}}>
                  <Icon type="tag-o" /> {function(){
                      switch (schedule.repeat_type) {
                        case 1:
                          return "单次"
                        case 2:
                          return "复习"
                        case 3:
                          return "每日"
                        case 4:
                          return "每周"
                        case 5:
                          return "每月"
                        case 6:
                          return "每年"
                        default:
                          return schedule.repeat_type
                      }
                  }()}
                </Col>
              </Row>
            )
          }
      }];
      return (
        <div>
          <Row type="flex" justify="center">
              <Col span="23">
                  <Input ref="addQuest" size="large" placeholder="添加任务..."
                      onKeyDown={this.handleAddQuestEnterDown} />
              </Col>
          </Row>
          <Row type="flex" justify="center">
              <Col span="23">
                  <br/>
                  <hr/>
              </Col>
          </Row>
          <Row type="flex" justify="center">
              <Col span="23">
                  <Table className="dataGrid"
                      style={{overflowY:"auto",height:this.state.dataGridHeight,}}
                      columns={columns}
                      dataSource={this.props.schedules}
                      rowKey={(recode, index) => recode.id}
                      pagination={false}
                      />
              </Col>
          </Row>
          <Modal
            title= "添加日程"
            width="800"
            visible={this.state.editModalVisible}
            confirmLoading={this.state.editModalLoading}
            onOk={this.handleOk}
            onCancel={this.handleCancel}>
            <Form horizontal>
              <FormItem>
                <Input
                  type="textarea"
                  placeholder="任务标题"
                  name="text"
                  value={this.state.formData.text}
                  onChange={this.setValue.bind(this, 'text')} />
              </FormItem>
              <FormItem>
                <Input
                  type="textarea"
                  placeholder="备注"
                  name="note"
                  value={this.state.formData.note}
                  onChange={this.setValue.bind(this, 'note')} />
              </FormItem>
              <FormItem
                  label="EXP："
                  labelCol={{span: 2}}
                  wrapperCol={{span: 16}}>
                  <div className="row">
                      <div className="col-20">
                          <Slider
                              min={0}
                              max={100}
                              step={null}
                              marks={{0:"0",10:"10",20:"20",30:"30",40:"40",
                                50:"50",60:"60",70:"70",80:"80",90:"90",100:"100"}}
                              onChange={this.setValue.bind(this, 'exp')}
                              value={this.state.formData.exp} />
                      </div>
                      <div className="col-4">
                          <InputNumber
                              min={0}
                              max={900}
                              step={10}
                              style={{marginLeft: '16px'}}
                              value={this.state.formData.exp}
                              onChange={this.setValue.bind(this, 'exp')} />
                      </div>
                  </div>
              </FormItem>
              <FormItem
                label="GOLD："
                labelCol={{span: 2}}
                wrapperCol={{span: 16}}>
                <div className="row">
                  <div className="col-20">
                    <Slider
                      min={0}
                      max={100}
                      step={null}
                      marks={{0:"$0",10:"$10",20:"$20",30:"$30",40:"$40",
                        50:"$50",60:"$60",70:"$70",80:"$80",90:"$90",100:"$100"}}
                        onChange={this.setValue.bind(this, 'gold')}
                        value={this.state.formData.gold} />
                    </div>
                    <div className="col-4">
                      <InputNumber
                        min={0}
                        max={900}
                        step={10}
                        style={{marginLeft: '16px'}}
                        value={this.state.formData.gold}
                        onChange={this.setValue.bind(this, 'gold')} />
                    </div>
                  </div>
                </FormItem>
                  <FormItem
                    label="重复类型："
                    labelCol={{span: 2}}
                    wrapperCol={{span: 16}}>
                    <Select
                      value={this.state.formData.repeat_type.toString()}
                      style={{width:120}}
                      onChange={this.setValue.bind(this, 'repeat_type')}
                      name="repeat_type">
                      <Option value="1">单次</Option>
                      <Option value="2">复习</Option>
                      <Option value="3">每日</Option>
                      <Option value="4">每周</Option>
                      <Option value="5">每月</Option>
                      <Option value="6">每年</Option>
                    </Select>
                  </FormItem>
                  <FormItem
                    label="开始时间："
                    labelCol={{span: 2}}
                    wrapperCol={{span: 16}}>
                    <div className="row">
                      <div className="col-6">
                        <DatePicker
                          value={this.state.formData.start_at || null}
                          disabledDate={function(current, value) {
                            return current && current.getTime() < Date.now();
                          }}
                          format="yyyy-MM-dd"
                          onChange={(value) => this.handleStartAtChange(value)} />
                      </div>
                    </div>
                  </FormItem>
                  <FormItem
                    label="提醒时间："
                    labelCol={{span: 2}}
                    wrapperCol={{span: 16}}>
                    <div className="row">
                      <div className="col-6">
                        <DatePicker
                          value={this.state.formData.alert_at || null}
                          showTime
                          format="yyyy-MM-dd HH:mm"
                          onChange={(value) => this.handleAlertAtChange(value)}
                           />
                      </div>
                      <div className="col-6">

                      </div>
                    </div>
                  </FormItem>
                  <FormItem
                    label="爹任务："
                    labelCol={{span: 2}}
                    wrapperCol={{span: 16}}>
                    <Select
                      style={{width: '100%'}}
                      searchPlaceholder="选择爹任务"
                      tags
                      onChange={() => {}}>
                      <Option value="1">今日待办</Option>
                      <Option value="2">下一步行动</Option>
                      <Option value="3">等待中</Option>
                      <Option value="0">收集箱</Option>
                      <OptGroup label="四大根分类">
                        <Option value="1">今日待办</Option>
                        <Option value="2">下一步行动</Option>
                        <Option value="3">等待中</Option>
                        <Option value="0">收集箱</Option>
                      </OptGroup>
                    </Select>
                  </FormItem>
                </Form>
              </Modal>
        </div>
      )
    }
})

function mapStateToProps(state) {
    let schedules = state.schedules.filter((schedule) => schedule.state === 0);
  return {
      schedules,
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onFetchEditSchedule: (schedule) => dispatch(actions.fetchEditSchedule(schedule)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleContainer)
