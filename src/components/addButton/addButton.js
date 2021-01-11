import React from "react"
import {Button} from "antd";
import {PlusOutlined} from '@ant-design/icons'
const AddButton = ({addClick,style = {marginLeft: '10px', marginBottom: '20px'}})=>(
    <div style={style}>
        <Button type="primary" onClick={() =>{ addClick()}}><PlusOutlined style={{color: '#fff'}}/> 新增&nbsp;</Button>
    </div>
);
export default AddButton
