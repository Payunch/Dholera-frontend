import React, { useState } from 'react'
import { getRowData } from '../SystemUtility/SystemUtility'

const HOCProductInfo = (ProductInfoLoader) => {

    const getProductInfo = (
        setDataLoadStatus, ProductNameList, setProductInfo,
        vac_productcode = '', vac_productcategory = '', vac_productname = ''
    ) => {
        let ProductInfo = { cmbProductCategory: '', cmbProductName: '' }
        if (vac_productcode.length > 0 && vac_productcode !== "") {
            ProductInfo = getRowData(ProductNameList, 'vac_productcode', vac_productcode)
        } else if (
            vac_productcategory.length > 0 && vac_productcategory !== '' &&
            vac_productname.length > 0 && vac_productname !== ''
        ) {
            ProductNameList.filter((row) => {
                if (row.vac_productcategory === vac_productcategory && row.vac_productname === vac_productname) {
                    ProductInfo = row
                }
            });
        }
        setProductInfo(ProductInfo, true)
    }

    return (props) => {
        return (
            <div className='ProductInfoLoader'>
                <ProductInfoLoader
                    {...props}
                    getProductInfo={getProductInfo}
                />
            </div>
        )
    }
}
export default HOCProductInfo