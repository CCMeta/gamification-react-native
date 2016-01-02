import React, { PropTypes } from 'react'
import { Menu, Icon, Switch } from 'antd';
import {Form, Input, Datepicker, Row, Col, Button, Progress, Tag} from "antd";
import QuestModalComponent from './QuestModalComponent.jsx';
import ScheduleModalComponent from './ScheduleModalComponent.jsx';
const SubMenu = Menu.SubMenu;
const FormItem = Form.Item;
const InputGroup = Input.Group;
const ProgressLine = Progress.Line;

const HeaderComponent = React.createClass({
    getInitialState() {
      let balance = 0;
      let dayIncome = 0;
      let exp = 0;
      return {
        balance,
        dayIncome,
        exp
      };
    },
    handleQuestsChange(){
      let today_at;
      today_at = (new Date()).getFullYear() + "-"
      today_at += (new Date()).getMonth() + 1 + "-"
      today_at += (new Date()).getDate()
      let balance = 0;
      let dayIncome = 0;
      let exp = 0;
      this.props.quests.forEach((value) => {
        if(value.state === 1){
          exp += value.exp
          balance += value.gold
          if(value.done_at === today_at){
            dayIncome += value.gold
          }
        }
      })
    },
    render() {
      let today_at;
      today_at = (new Date()).getFullYear() + "-"
      today_at += (new Date()).getMonth() + 1 + "-"
      today_at += (new Date()).getDate()
      let balance = 0;
      let dayIncome = 0;
      let exp = 0;
      let cost = 0;
      this.props.quests.forEach((value) => {
        if(value.state === 1){
          exp += value.exp
          balance += value.gold
          if(value.done_at === today_at){
            dayIncome += value.gold
          }
        }
      });
      this.props.bag_items.forEach((bag_item) => {
        let item = this.props.items.find((item) => item.id === bag_item.item_id)
        if(item){
          cost += item.price
        }
      });
        return (
            <header>
                <Row>
                    <Col span="4" style={{textAlign:"center"}}>
                        <a href="../..">
                            <img
                                width="60"
                                src="https://t.alipayobjects.com/images/rmsweb/T1B9hfXcdvXXXXXXXX.svg"/>
                        </a>
                    </Col>
                    <Col span="9">
                        <Menu selectedKeys={[]}
                            mode="horizontal">
                            <Menu.Item key="mail">
                                <QuestModalComponent {...this.props}/>
                            </Menu.Item>
                            <Menu.Item key="app">
                                <ScheduleModalComponent {...this.props}/>
                            </Menu.Item>
                            <Menu.Item>
                                <Row type="flex">
                                    <Col>
                                        <Icon type="search" />
                                    </Col>
                                    <Col>
                                        <Input placeholder="搜索..." />
                                    </Col>
                                </Row>
                            </Menu.Item>
                        </Menu>
                    </Col>
                    <Col span="11">
                      <Row >
                        <Col span="2" type="flex" justify="end">
                            <Tag color="green" style={{fontSize:"12px"}}>
                              Lv.{parseInt(exp / 1000) + 1}
                            </Tag>
                        </Col>
                        <Col span="20">
                          <ProgressLine
                            percent={parseInt(exp / 1000 * 100)}
                            format="${percent}%"
                            status="active" />
                        </Col>
                      </Row>
                        <Row type="flex" justify="center">
                          <Col>
                            <Tag color="yellow" style={{fontSize:"12px"}}>
                              当日获得：{dayIncome}
                            </Tag>
                            <Tag color="red" style={{fontSize:"12px"}}>
                              当前存款：{balance - cost}
                            </Tag>
                          </Col>
                        </Row>
                    </Col>
                </Row>
            </header>
        )
    }
})

export default HeaderComponent
