import React from 'react'
import { useSelector } from 'react-redux';

const ChattingBox1 = () => {
    const chattingPartner = useSelector((state) => state.chattingPartner)

    
    return (
        <div className='bg-secondary rounded-3 ' style={{}}>
            <div className="h-100 d-flex justify-content-between">
                <div className='d-flex justify-content-start'>
                    <div className="d-flex align-items-center justify-content-between py-1 px-2">
                        
                        <img className='photo p-0 m-0' style={{ cursor: 'pointer' }}
                            onClick={() => { }} src={chattingPartner.partner_pic ? chattingPartner.partner_pic : '/unknown.jpg'} alt="" />
                    </div>

                    <div className='py-1 m-0 d-flex flex-column align-items-center'>
                        <h5 className='p-0 m-0 text-start'>{chattingPartner.partner_name? chattingPartner.partner_name:''}</h5>
                        <p className='p-0 m-0'>last seen: 21/23/25</p>
                    </div>



                </div>


                <button type="button" className="btn btn-info m-3 p-0 px-2">Block</button>



            </div>
        </div>
    )
}

export default ChattingBox1
