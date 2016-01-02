import React, { PropTypes } from 'react'
import { Modal, Button, Icon, Upload } from 'antd';
import { Form, Input, Col, Slider, InputNumber, Select, Datepicker, Timepicker} from 'antd';
const FormItem = Form.Item;

const ItemModalComponent = React.createClass({
  mixins: [Form.ValueMixin],
  getInitialState() {
    return {
        visible: false,
        loading: false,
        formData: {
          name: '',
          price: 0,
          img: '',
        }
     };
  },
  showModal() {
    this.setState({
      visible: true,
      formData: {...this.state.formData,
      }
    });
  },
  handleOk() {
    let formData = this.state.formData;
    let options = {};
    if(formData.name){
      options.name = formData.name;
    }
    if(formData.price){
      options.price = formData.price;
    }
    if(formData.img){
      options.img = formData.img;
    }
    this.props.onFetchAddItem(options);
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
  handleUploadImgDone(img) {
    this.setState({
      formData: {...this.state.formData,
        img
      }
    });
  },
  render() {
    const uploadProps = {
      name: "item_img",
      action: 'http://gamification.0x00000000.me/upload',
      onChange: (info) => {
        if (info.file.status !== 'uploading') {
          // console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          this.handleUploadImgDone(info.file.response.data)
        } else if (info.file.status === 'error') {
        }
      }
    };
    return (
      <div>
        <Button
          type="primary"
          onClick={this.showModal}>
          <Icon type="plus" />
          添加物品
        </Button>
        <Modal
          title= "添加任务"
          width="800"
          visible={this.state.visible}
          confirmLoading={this.state.loading}
          onOk={this.handleOk}
          onCancel={this.handleCancel}>
          <Form horizontal>
            <FormItem>
              <Upload {...uploadProps}>
                <Button type="ghost">
                  <Icon type="upload"/> 点击上传
                  </Button>
                </Upload>
              </FormItem>
              <FormItem>
                <Input
                  type="text"
                  placeholder="物品名称"
                  name="name"
                  value={this.state.formData.name}
                  onChange={this.setValue.bind(this, 'name')} />
              </FormItem>
              <FormItem>
                <Input
                  type="text"
                  placeholder="物品价格"
                  name="price"
                  value={this.state.formData.price}
                  onChange={this.setValue.bind(this, 'price')} />
              </FormItem>
              <FormItem>
                <Input
                  disabled
                  type="text"
                  placeholder="图片名称"
                  name="img"
                  value={this.state.formData.img}
                  onChange={this.setValue.bind(this, 'img')} />
              </FormItem>
            </Form>
          </Modal>
        </div>
      )
  }
})
export default ItemModalComponent
