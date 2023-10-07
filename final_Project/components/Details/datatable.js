import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';

const customStyles = {
    rows: {
        style: {
            minHeight: '56px', // Adjust the row height as needed
        },
    },
    headCells: {
        style: {
            backgroundColor: '#6B21AB', // Header background color
            color: 'white', // Header text color
            fontWeight: 'bold', // Header font weight
        },
    },
};

const columns = [
    {
        name: 'Bank',
        selector: 'bank_name',
        sortable: true,
    },
    {
        name: 'Name',
        selector: 'loan_name',
        sortable: true,
    },
    {
        name: 'Interest Rate',
        selector: 'interest_rate',
        sortable: true,
    },
    {
        name: 'Processing fee',
        selector: 'processing_fee',
        sortable: true,
        cell: (row) => (row.processing_fee != null && row.processing_fee != 0 ? row.processing_fee : '-'),
    },
    {
        name: 'Tenure',
        selector: 'tenure',
        sortable: true,
        cell: (row) => (row.tenure != null && row.tenure != 0 ? row.tenure : '-'),
    },
    // Add more columns as needed
];

const data = [
    {
        "bank_name": "Laxmi Sunrise",
        "interest_rate": "12.99% -14.99%",
        "loan_name": "Personal-Loan Fixed Rate",
        "tenure": "15 years",
        
    },
    {
        "bank_name": "Nepal Bank Nepal Bank Ltd.",
        "interest_rate": "13.05% -14.05%",
        "loan_name": "Personal Term loan",
        "tenure": "10 years",
        "fee": "-"
    },
    {
        "bank_name": "Nepal SBI Nepal SBI Bank",
        "interest_rate": "15.50%-15.50%",
        "loan_name": "Personal TL-Fixed",
        "tenure": "10 years",
        
    },
    {
        "bank_name": "RBB Rastriya Baya Bank",
        "interest_rate": "13.50% -13.50%",
        "loan_name": "Personal-Loan Fixed Rate",
        "tenure": "10 years",
        "fee": "-",
    },
    {
        "bank_name": "NIC Asia",
        "interest_rate": "10.76% -16.76%",
        "loan_name": "Personal Loan",
        "tenure": "5 years",
        "fee": "-"
    },
    {
        "bank_name": "TOCASIA Bank",
        "interest_rate": "Base Date Update",
        "loan_name": "Personal Term loan",
        "tenure": "5 years",
        "fee": "-"
    },
    {
        "bank_name": "Nepal Bank Nepal Bank Ltd.",
        "interest_rate": "12.55% 13.55%",
        "loan_name": "Personal Term loan",
        "tenure": "5 years",
        "fee": "-"
    },
    {
        "bank_name": "NIC ASIA Bank",
        "interest_rate": "14.99% -14.99%",
        "loan_name": "Personal Loan Fixer",
        "tenure": "5 years",
        "fee": "-"
    },
    {
        "bank_name": "Nepal Bank Nepal Bank Ltd",
        "interest_rate": "13.50% - 14.50%",
        "loan_name": "Personal Term Loan-Fixed Rate",
        "tenure": "5 years",
        "fee": "-"
    },
    {
        "bank_name": "Nepal SBI Nepal 581 Bank",
        "interest_rate": "14.50% -14.50%",
        "loan_name": "Personal TL-Fixed",
        "tenure": "5 years",
        "fee": "-"
    },
    {
        "bank_name": "SCB Standard Chartered task",
        "interest_rate": "13.25% -13,25%",
        "loan_name": "Personal Loan Fixed Rate",
        "tenure": "5 years",
        "fee": "-"
    },
    {
        "bank_name": "Nepal SBI Nepal SBI Bank",
        "interest_rate": "13.50% -13.50%",
        "loan_name": "Personal TL-Fixed",
        "tenure": "3 years",
        "fee": "-"
    },
    {
        "bank_name": "Krishi Bikas Agriculture Dev. Bank",
        "interest_rate": "10.34% -15.34%",
        "loan_name": "Overdraft-individual",
        "tenure": "N/A",
        "fee": "-"
    },
    {
        "bank_name": "RBB Rastriya Baya Bank",
        "interest_rate": "11.77% -12.02%",
        "loan_name": "Personal Loan",
        "tenure": "N/A",
        "fee": "-"
    },
    {
        "bank_name": "Sanima Bank",
        "interest_rate": "10.06% -15.06%",
        "loan_name": "Personal Overdraft/Loan",
        "tenure": "N/A",
        "fee": "-"
    },
    {
        "bank_name": "Prabhu Bank",
        "interest_rate": "10.18%-15.18%",
        "loan_name": "Other Personal Loan",
        "tenure": "N/A",
        "fee": "-"
    },
    // Add more data rows as needed
];

const Table = () => {
    const [isClient, setIsClient] = useState(false);
    const [sortedData, setSortedData] = useState(data);
    const [sortField, setSortField] = useState('bank_name');
    const [sortDirection, setSortDirection] = useState('asc');
    const [searchText, setSearchText] = useState('');
    const [bankData, setBankData] = useState();
    const [renderapp, setRenderapp] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        // Ensure that bankData is not undefined and is an array
        if (bankData && Array.isArray(bankData) && bankData.length > 0) {
            // Sort the data based on the selected field and direction
            const sorted = [...bankData].sort((a, b) => {
                console.log("aaa", sortField);
                if (sortField === 'interest_rate') {
                    // Special handling for sorting by Interest Rate
                    const rateA = parseInterestRate(a.interest_rate);
                    const rateB = parseInterestRate(b.interest_rate);

                    if (sortDirection === 'asc') {
                        return rateA - rateB;
                    } else {
                        return rateB - rateA;
                    }
                } else {
                    // Default sorting based on other fields
                    return a[sortField].localeCompare(b[sortField]);
                }
            });

            setSortedData(sorted);
        }
    }, [sortField, sortDirection]);


    const parseInterestRate = (rate) => {
        // Custom function to parse interest rate values, adjust as needed
        // For example, you might need to extract the numeric part and convert it to a number
        return parseFloat(rate.replace('%', '').trim()) || 0;
    };

    const handleSortChange = (event) => {
        const { name, value } = event.target;
        
        if (name === 'sortField') {

            // Update the sort field based on the selected option
            setSortField(value);
        } else if (name === 'sortDirection') {
            // Update the sort direction based on the selected option
            setSortDirection(value);
        }
    };
    useEffect(() => {

        const loadBlog = async () => {
            try {

                const response = await axios.get(
                    `http://localhost:8080/api/bank`
                );
                console.log("aad", response.data.data)

                setBankData(response.data.data);

                setRenderapp(true);
                // Filter data based on search text
                const filteredData = response.data.data.filter((item) =>
                    item.bank_name.toLowerCase().includes(searchText.toLowerCase()) ||
                    item.loan_name.toLowerCase().includes(searchText.toLowerCase())
                );
                console.log("filterData", filteredData)

                setSortedData(filteredData);

            } catch (error) {
                console.log(error);
            }
        };
        loadBlog()


    }, [searchText]);
    const handleSearchChange = (event) => {
        // Update the search text when the user types in the search input
        console.log("seaech", event.target.value)
        setSearchText(event.target.value);
    };
    if (!isClient) {
        // Return a placeholder or loading indicator when rendering on the server
        return <div>Loading...</div>;
    }

    return (
        <>
            {renderapp && (
                <div className="mx-10">

                    <div className='flex flex-wrap  justify-between py-4'>
                        <div className='flex flex-wrap'>

                            <div className='flex flex-wrap mr-5'>
                                <label htmlFor="sortField" className="pt-1">Sort by: &nbsp; </label>
                                <select
                                    className="border-purple-500 py-2 px-4  border  rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                                    id="sortField"
                                    name="sortField"
                                    value={sortField}
                                    onChange={handleSortChange}
                                >
                                    <option value="bank_name">Bank Name</option>
                                    <option value="loan_name">Loan Name</option>
                                    <option value="interest_rate">Interest Rate</option>
                                    <option value="processing_fee">Processing fee</option>
                                    <option value="tenure">Tenure</option>
                                </select>
                            </div>

                            <div className='flex flex-wrap  max-sm:mt-4'>
                                <div className='flex flex-wrap'>
                                    <label htmlFor="sortDirection" className='pt-1'>Direction :&nbsp;</label>
                                    <select
                                        className="border-purple-500 py-2 px-4  border  rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none" // Add margin-left to create space
                                        id="sortDirection"
                                        name="sortDirection"
                                        value={sortDirection}
                                        onChange={handleSortChange}
                                    >
                                        <option value="asc">Low to High</option>
                                        <option value="desc">High to Low</option>
                                    </select>
                                </div>
                            </div>

                        </div>


                        <div className='flex flex-wrap items-center max-md:mt-4'>
                            <label htmlFor="searchText" className="mr-2">Search:</label>
                            <input
                                type="text"
                                id="searchText"
                                name="searchText"
                                value={searchText}
                                onChange={handleSearchChange}
                                className="search-input border-purple-500 py-2 px-4  border nr-3 rounded-md text-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
                            />

                        </div>


                    </div>


                    <DataTable
                        columns={columns}
                        data={sortedData}
                        customStyles={customStyles}
                        pagination
                        paginationPerPage={5}
                        paginationRowsPerPageOptions={[5, 10, 15, 20]}
                        paginationComponentOptions={{
                            rowsPerPageText: 'Rows per page:',
                        }}
                        defaultSortField="bank"
                        defaultSortAsc={true}
                        striped={true}
                    />
                </div>
            )}
        </>
    );
};

export default Table;
