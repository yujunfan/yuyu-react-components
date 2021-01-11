import React from 'react';
import { render } from 'react-dom';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import MapGeocoder from "./components/geocoder/index"


const domA =(
    <div>
               <MapGeocoder
                visible={true}
                close={()=>{console.log("aaa")}}
                fullAddress={'aa'}
                getLntlag={(aa)=>{console.log(aa)} }/>
    </div>
)

render(domA, document.getElementById('root'));
