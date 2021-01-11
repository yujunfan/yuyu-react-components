import React, {useEffect,useState}from "react";
import {Button, Input, Modal} from "antd";
import ReLoadMap from "./../reloadMap/index";


let map;
let geocoder;
let marker;
let positionPicker;
let autocomplete;
const MapGeocoder = ({visible,close,fullAddress,getLntlag,
    mapStyle='amap://styles/2dc8da212f30ab4ef44e5766564d0c9c',
    mapUrl='https://webapi.amap.com/maps?v=1.4.15&key=896a9ce2a8b9017a051ea4a36c570ce0&&y&&plugin=AMap.Geocoder,AMap.ToolBar,AMap.Geolocation,AMap.Autocomplete,AMap.MarkerClusterer,AMap.Heatmap',
    mapUiUrl='https://webapi.amap.com/ui/1.1/main.js'}
    ) => {
    const [center,setCenter]= useState([113.75330916866295, 23.040176579824]);
    const [address,setAddress] = useState('')
    const [lnglat,setLnglat]= useState('')
    const [loadingMap,setLoadingMap] =  useState(false)

    useEffect(()=>{

    },[])

    useEffect(()=>{
        loadMap()
    },[visible]);


    /** 加载地图和地图UI加载完成 */
    const  handleScriptLoad = () =>{
        loadMap()
    }

    /** 加载地图 */
    const loadMap = () => {
        try {
            fullAddress&&setAddress(fullAddress)
                window.AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker){
                    try{
                        map = new window.AMap.Map("container", {
                            resizeEnable: true,
                            mapStyle:  mapStyle, //样式
                            zoom: 18,
                            center: center,
                            scrollWheel: false //不能通过滚动缩放地图
                        });
                        autocomplete = new window.AMap.Autocomplete({
                            input: 'address'
                        });
                        geocoder = new window.AMap.Geocoder({});
                        autocomplete.on('select',(result)=>{
                            let lnglat = result.poi.location
                            marker.setPosition(lnglat);
                            map.setFitView(marker);
                        });
                        marker = new window.AMap.Marker({});
                            positionPicker = new PositionPicker({
                                mode: 'dragMap',
                                map: map,
                                iconStyle:{//自定义外观
                                    url:'//webapi.amap.com/ui/1.0/assets/position-picker2.png',//图片地址
                                    size:[48,48],  //要显示的点大小，将缩放图片
                                    ancher:[24,40],//锚点的位置，即被size缩放之后，图片的什么位置作为选中的位置
                                }
                            });
                            positionPicker.on('success', function(positionResult) {
                                setAddress(positionResult.address)
                                setLnglat(positionResult.position.lng + ',' + positionResult.position.lat)
                            });
                            positionPicker.start();
                            if (fullAddress){
                                geoCode()
                            }
                        map.panBy(0, 1);
                        map.addControl(new window.AMap.ToolBar({
                            liteStyle: true
                        }))
                    }catch (e) {
                        setLoadingMap(true)
                    }

                });
        }catch (e) {
            setLoadingMap(true)
        }
    }
   const geoCode = () => {
        geocoder.getLocation(fullAddress, function(status, result) {
            if (status === 'complete'&&result.geocodes.length) {
               let lnglat = result.geocodes[0].location
                document.getElementById('lnglat').value = lnglat;
                marker.setPosition(lnglat);
                setCenter([lnglat.lng,lnglat.lat])
                map.setFitView(marker);
                positionPicker.start(lnglat);
            }
        });
    }
    /** 确认 */
    const confirm = async () => {
        try {
            getLntlag(lnglat)
            close()
        } catch (errInfo) {
            close()
        }


    };


    return (
        <Modal
            title={"选择经纬度"}
            forceRender
            closable={false}
            visible={visible}
            onClose={()=>close()}
            width={800}
            footer={(
                <div>
                    <Button type="primary" onClick={()=>{close()}}>取消</Button>
                    <Button type="primary" onClick={()=>{confirm()}}>确定</Button>
                </div>
            )}
        >
            <div style={{width:'760px', height:'600px'}}>
                <ReLoadMap handleScriptLoad={handleScriptLoad} loadingMap={loadingMap} mapUrl={mapUrl} mapUiUrl={mapUiUrl}  />
                <Input style={{width:'100%', marginBottom:'10px'}} id="address" value={address} onChange={e=>{setAddress(e.target.value)}}/>
                <Input style={{width:'100%', marginBottom:'10px'}} id="lnglat" value={lnglat} onChange={e=>{setLnglat(e.target.value)}}/>
                <div style={{width:'100%', height:'500px'}} id="container" />
            </div>
        </Modal>
    );
}
export default  MapGeocoder