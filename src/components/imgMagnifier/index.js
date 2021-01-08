import React, { useEffect, useState } from "react"
const ImgMagnifier = ({ pwidth,pheight, scale=1, marginTop = 0, marginLeft = 10,src,  id, style }) => {
    const [visible, setVisible] = useState(false)
    const [width, setWidth] = useState('auto')
    const [height, setHeight] = useState('auto')
    const [top, setTop] = useState(0)
    const [left, setLeft] = useState(0)
    const [offsetWidth, setOffsetWidth] = useState(0)
    useEffect(() => {
        const imgA = document.getElementById('id')
        imgA.addEventListener('mouseover', ()=>isShowImg(true));
        imgA.addEventListener('mouseout',  ()=>isShowImg(false));
        imgA.addEventListener('mousemove', e=>mousemove(e,imgA.offsetWidth,imgA.offsetHeight));
    }, [])

    const isShowImg = (value) =>{
        setVisible(value)
    }
    //鼠标移入事件
    const mousemove = (e,offsetWidth,offsetHeight)=>{
        console.log(offsetWidth,offsetHeight,'aaa')
        const scaleX = e.offsetX / offsetWidth;//处于左边部分的距离
        const scaleY = e.offsetY / offsetHeight;//
        updImg(scaleX, scaleY, offsetWidth, offsetHeight)
    }

    //监听
    const updImg = (scaleX, scaleY, width, height) => {
        const top = (scaleY * pheight) - (scaleY * height * scale) + 'px';
        const left = (scaleX * pwidth) - (scaleX * width * scale) + 'px';
        setTop(top)
        setLeft(left)
    }
    // 图片加载后触发
    const onImgLoad = () =>{
        const imgA = document.getElementById('id')
        setWidth(imgA.offsetWidth * scale)
        setHeight(imgA.offsetHeight * scale)
        setOffsetWidth(imgA.offsetWidth)
    }

    return <div style={{ ...style, display: 'flex' }} >
        <img onLoad={()=>onImgLoad()} style={{ maxWidth: '100%', maxHeight: '300px' }} src={src} id={'id'} />
        {
            visible && <div
                style={{
                    width: pwidth + 'px',
                    height: pheight + 'px',
                    border: '1px solid rgba(250,250,250,.6)',
                    overflow: 'hidden',
                    position: 'fixed',
                    marginLeft: offsetWidth,
                    zIndex: 1000
                }}>
                <img style={{ width: width + 'px', height: height + 'px', left: left, top: top, position: 'relative' }} src={src} id={'big_Id'} />
            </div>
        }
    </div>

}
export default ImgMagnifier