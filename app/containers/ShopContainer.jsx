import React, { PropTypes } from 'react'
import {connect} from 'react-redux';
import * as actions from '../actions/actionsCreators.jsx';
import ItemModalComponent from '../components/ItemModalComponent.jsx';

import { Row, Col, Tabs, Icon, Button, Menu, DropdownButton, Collapse, Tag, Popconfirm, message  } from 'antd';
const TabPane = Tabs.TabPane;
const Panel = Collapse.Panel;
const ButtonGroup = Button.Group;

const ShopContainer = React.createClass({
    render () {
      const tabContent = [
        <span><Icon type="apple" />装备类</span>,
        <span><Icon type="android" />道具类</span>,
      ];
      return (
        <div>
          <Row type="flex" justify="center">
            <Col span="23">
              <Tabs type="card" tabBarExtraContent={<ItemModalComponent {...this.props}/>}>
                <TabPane tab={tabContent[0]} key="1">
                  <Row>
                  {this.props.items.map((item, index) =>
                    <Col span="8" key={index}>
                      <Collapse defaultActiveKey="1">
                        <Panel
                          header={item.name}
                          key="1">
                            <img
                              style={{width:"100%"}}
                              src={ "//gamification.0x00000000.me/assets/uploads/" + item.img } />
                          <Row type="flex" justify="center">
                            <ButtonGroup>
                              <Button type="ghost">
                                $ {item.price}
                              </Button>
                              <Popconfirm
                                title="确定购买吗？"
                                onConfirm={ () => this.props.onFetchAddBagItem(item.id) }
                                onCancel={ () =>  {} }>
                                <Button type="primary">
                                  <Icon type="pay-circle-o" />
                                  购买
                                </Button>
                              </Popconfirm>
                            </ButtonGroup>
                          </Row>
                        </Panel>
                      </Collapse>
                    </Col>
                  )}
                </Row>
                </TabPane>
                <TabPane tab={tabContent[1]} key="2">
                  {this.props.items.map((item, index) =>
                    <Col span="12" key={index}>
                      <Row type="flex" justify="center">
                        <Col span="23">
                          <Collapse defaultActiveKey="1">
                            <Panel
                              header={item.name}
                              key="1">
                                <Tag color="green">{item.name} -  {item.price}</Tag>
                            </Panel>
                          </Collapse>
                        </Col>
                      </Row>
                    </Col>
                  )}
                </TabPane>
              </Tabs>
            </Col>
          </Row>
        </div>
      )
    }
})

function mapStateToProps(state) {
    let items = state.items;
    return {
        items
    }
}

function mapDispatchToProps(dispatch) {
  return {
    onFetchAddBagItem: (item_id) => dispatch( actions.fetchAddBagItem(item_id) ),
    onFetchAddItem: (item) => dispatch( actions.fetchAddItem(item) ),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShopContainer)
