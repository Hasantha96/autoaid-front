import React, { useState, useEffect } from 'react'
import CostEstimation from '../../components/Atoms/CostEstimation'
import SelectedServiceActivitiesSVAD from '../../components/Atoms/SelectedServiceActivitiesSVAD'
import SelectedSevicesSVAD from '../../components/Atoms/SelectedSevicesSVAD'
import SectionItems from '../../components/Atoms/serviceStation/SectionItems'
import SectionSelectionTop from '../../components/Atoms/serviceStation/SectionSelectionTop'
import SelectionSectionNavbar from '../../components/Atoms/serviceStation/SelectionSectionNavbar'
import TopContainerVNo from '../../components/Atoms/technician/TopContainerVNo'
import TimeEstimationSVAD from '../../components/Atoms/TimeEstimationSVAD'
import SelectionSectionNavbarMolecular from '../../components/Moleculars/serviceAdvisor/SelectionSectionNavbarMolecular'
import SideNav from '../../components/Moleculars/serviceAdvisor/sideNav'
import axios from 'axios'
import { getCookie } from '../../jsfunctions/cookies'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { toast } from 'react-toastify'


export default function SectionSelection() {
    const [sectionName, setsectionName] = useState();
    const [subCatDetails, setsubCatDetails] = useState([{}]);
    const [repairList, setrepairList] = useState([]);
    const [totalTime, settotalTime] = useState(0);
    const [estimatedPrice, setestimatedPrice] = useState(0);
    const repairId=0;

    const location = useLocation();
    // console.log(location.state);

    var config = {
        headers: {
            'Authorization': 'Bearer ' + getCookie('token'),
        }
    }
    function proceedRepair(){
        //Add Repair
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/advisor/addRepair`,{
            "paymentType":"ONLINE",
            "userId":location.state.userId,
            "vin":location.state.vin
        }, config)
        .then(function(response){
            console.log(response.data);
            //Then add service entries
            axios.post(`${process.env.REACT_APP_API_BASE_URL}/advisor/add service entries`, {
                "userId": location.state.userId,
                "repairId": response.data,
                "serviceEntryInstances": repairList
            }, config)
                .then(function (res) {
                    console.log(res.data);

                })
            toast.success('✔ Repair Added Successfully');

        })
        // console.log(location.state);  
        // console.log("proceed");        
        // console.log(repairList);
        // console.log(repairId);
        
    }
    function inspectionOnly(){
        console.log("Redirect to cashier");
        
    }
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/advisor/getSubCategories/${sectionName}`, config)
            .then(function (response) {
                console.log(response.data);
                setsubCatDetails(response.data);
            })
    }, [sectionName])


    return (
        <div className=" bg-Background-0">
            <div className="flex flex-row">
                <div className="">
                    <SideNav />
                </div>
                <div className="w-full flex flex-col">
                    <SectionSelectionTop heading1={location.state.vehicleNo} />
                    <div className="flex justify-between w-full">
                        <div className="w-3/6 bg-white shadow-xl rounded-lg mt-12 ml-6 p-8">
                            <div className="font-primary text-xl">Select Section</div>
                            <div className="  p-1 rounded-lg mt-4 w-full">
                                <SelectionSectionNavbarMolecular sectionName={sectionName} setsectionName={setsectionName} />
                            </div>
                            <div>
                                {subCatDetails.map(subCat => <SectionItems estimatedPrice={estimatedPrice} setestimatedPrice={setestimatedPrice}
                                    totalTime={totalTime} settotalTime={settotalTime} setrepairList={setrepairList} repairList={repairList}
                                    subCat={subCat}/>)}
                            </div>
                        </div>
                        <div className="w-2/6 bg-white shadow-xl rounded-lg mt-12  mr-32 p-8">
                            <SelectedSevicesSVAD heading1="Selected Service" description="Time and Cost can be differ with the change of requirements " />
                            <div className="mt-6 mb-4">

                                {repairList.map(addedRepair => <SelectedServiceActivitiesSVAD addedRepair={addedRepair}
                                    repairList={repairList} setrepairList={setrepairList} totalTime={[totalTime,settotalTime]} 
                                    estimatedPrice={[estimatedPrice,setestimatedPrice]} />)}

                                <div className="border-b-2 mt-4"></div>
                            </div>
                            <div className="mt-6">
                                <TimeEstimationSVAD time={totalTime} />
                            </div>
                            <div className="mt-6">
                                <CostEstimation cost={estimatedPrice.toFixed(2)} />
                                {/* Need to add styles */}
                                <button onClick={proceedRepair} className=" ml-10 bg-blue-800 text-white">Proceed to repair</button>
                                <button onClick={inspectionOnly} className=" ml-10 bg-red-800 text-white">Inspection Only</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

