import React, { PropTypes } from 'react'
import { Modal, Button, Icon } from 'antd';
import { Form, Input, Col, Slider, InputNumber, Select, DatePicker } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const OptGroup = Select.OptGroup;


const ScheduleModalComponent = React.createClass({
  mixins: [Form.ValueMixin],
  getInitialState() {
    let start_at;
    start_at = (new Date()).getFullYear() + "-"
    start_at += (new Date()).getMonth() + 1 + "-"
    start_at += (new Date()).getDate() + 1
    return {
        visible: false,
        loading: false,
        formData: {
          text: '',
          note: '',
          exp: 0,
          gold: 0,
          repeat_type: 1,
          // alert_at: '',
          start_at
        }
     };
  },
  showModal() {
    this.setState({
      visible: true,
      formData: {...this.state.formData}
    });
  },
  handleOk() {
    let formData = this.state.formData;
    let schedule = {
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
    this.props.onFetchAddSchedule(schedule);
    this.setState({ loading: true });
    setTimeout(() => {
      this.setState({ loading: false, visible: false });
    }, 1000);
  },
  handleCancel() {
    this.setState({
      visible: false
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
  render() {
    return (
      <div>
        <Button
          type="primary"
          onClick={this.showModal}>
          <Icon type="plus-circle-o" />日程
        </Button>
        <Modal
          title= "添加日程"
          width="800"
          visible={this.state.visible}
          confirmLoading={this.state.loading}
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
export default ScheduleModalComponent
