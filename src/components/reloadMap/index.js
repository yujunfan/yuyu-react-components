/**
   * @Description 如果地图加载失败，重新加载
   * @Date 9:57 2020/10/16
   **/
  import React, {useState} from "react"
  import Script from "react-load-script";
  import {Modal} from "antd";
  const ReLoadMap = ({loadingMap,handleScriptLoad,mapUrl,mapUiUrl})=>{
      const [loadMapUi,setLoadMapUi] = useState(false)
      const handleScriptError = () => {
          Modal.error({
              title: '地图加载失败',
              content: '地图加载失败，请确认网络连接正常',
          });
      }
      /** 加载地图完成 */
      const  handleScriptLoadMap = () =>{
          setLoadMapUi(true)
      };
      return(
          <div>
              {
                  loadingMap&&<Script
                      url={mapUrl}
                      onError={()=>handleScriptError()}
                      onLoad={()=>handleScriptLoadMap()}
  
                  />
              }
  
              {
                  loadMapUi&&<Script
                      url={mapUiUrl}
                      onError={()=>handleScriptError()}
                      onLoad={()=>handleScriptLoad()}
                  />
              }
          </div>
      )
  }
  export default ReLoadMap  