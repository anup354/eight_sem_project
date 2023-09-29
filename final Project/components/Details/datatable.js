import React, { useEffect, useState } from 'react';
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
        selector: 'bank',
        sortable: true,
    },
    {
        name: 'Name',
        selector: 'name',
        sortable: true,
    },
    {
        name: 'Interest Rate',
        selector: 'interestRate',
        sortable: true,
    },
    {
        name: 'Processing fee',
        selector: 'fee',
        sortable: true,
    },
    {
        name: 'Tenure',
        selector: 'tenure',
        sortable: true,
    },
    // Add more columns as needed
];

const data = [
    {
        "bank": "Laxmi Sunrise",
        "interestRate": "12.99% -14.99%",
        "name": "Personal-Loan Fixed Rate",
        "tenure": "15 years",
        "fee": "-"
    },
    {
        "bank": "Nepal Bank Nepal Bank Ltd.",
        "interestRate": "13.05% -14.05%",
        "name": "Personal Term loan",
        "tenure": "10 years",
        "fee": "-"
    },
    {
        "bank": "Nepal SBI Nepal SBI Bank",
        "interestRate": "15.50%-15.50%",
        "name": "Personal TL-Fixed",
        "tenure": "10 years",
        "fee": "-"
    },
    {
        "bank": "RBB Rastriya Baya Bank",
        "interestRate": "13.50% -13.50%",
        "name": "Personal-Loan Fixed Rate",
        "tenure": "10 years",
        "fee": "-",
    },
    {
        "bank": "NIC Asia",
        "interestRate": "10.76% -16.76%",
        "name": "Personal Loan",
        "tenure": "5 years",
        "fee": "-"
    },
    {
        "bank": "TOCASIA Bank",
        "interestRate": "Base Date Update",
        "name": "Personal Term loan",
        "tenure": "5 years",
        "fee": "-"
    },
    {
        "bank": "Nepal Bank Nepal Bank Ltd.",
        "interestRate": "12.55% 13.55%",
        "name": "Personal Term loan",
        "tenure": "5 years",
        "fee": "-"
    },
    {
        "bank": "NIC ASIA Bank",
        "interestRate": "14.99% -14.99%",
        "name": "Personal Loan Fixer",
        "tenure": "5 years",
        "fee": "-"
    },
    {
        "bank": "Nepal Bank Nepal Bank Ltd",
        "interestRate": "13.50% - 14.50%",
        "name": "Personal Term Loan-Fixed Rate",
        "tenure": "5 years",
        "fee": "-"
    },
    {
        "bank": "Nepal SBI Nepal 581 Bank",
        "interestRate": "14.50% -14.50%",
        "name": "Personal TL-Fixed",
        "tenure": "5 years",
        "fee": "-"
    },
    {
        "bank": "SCB Standard Chartered task",
        "interestRate": "13.25% -13,25%",
        "name": "Personal Loan Fixed Rate",
        "tenure": "5 years",
        "fee": "-"
    },
    {
        "bank": "Nepal SBI Nepal SBI Bank",
        "interestRate": "13.50% -13.50%",
        "name": "Personal TL-Fixed",
        "tenure": "3 years",
        "fee": "-"
    },
    {
        "bank": "Krishi Bikas Agriculture Dev. Bank",
        "interestRate": "10.34% -15.34%",
        "name": "Overdraft-individual",
        "tenure": "N/A",
        "fee": "-"
    },
    {
        "bank": "RBB Rastriya Baya Bank",
        "interestRate": "11.77% -12.02%",
        "name": "Personal Loan",
        "tenure": "N/A",
        "fee": "-"
    },
    {
        "bank": "Sanima Bank",
        "interestRate": "10.06% -15.06%",
        "name": "Personal Overdraft/Loan",
        "tenure": "N/A",
        "fee": "-"
    },
    {
        "bank": "Prabhu Bank",
        "interestRate": "10.18%-15.18%",
        "name": "Other Personal Loan",
        "tenure": "N/A",
        "fee": "-"
    },
    // Add more data rows as needed
];

const Table = () => {
    const [isClient, setIsClient] = useState(false);
    const [sortedData, setSortedData] = useState(data);
    const [sortField, setSortField] = useState('bank');
    const [sortDirection, setSortDirection] = useState('asc');
    const [searchText, setSearchText] = useState('');
    useEffect(() => {
        setIsClient(true);
    }, []);

    useEffect(() => {
        // Sort the data based on the selected field and direction
        const sorted = [...data].sort((a, b) => {
            if (sortField === 'interestRate') {
                // Special handling for sorting by Interest Rate
                const rateA = parseInterestRate(a.interestRate);
                const rateB = parseInterestRate(b.interestRate);

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
        // Filter data based on search text
        const filteredData = data.filter((item) =>
            item.bank.toLowerCase().includes(searchText.toLowerCase()) ||
            item.name.toLowerCase().includes(searchText.toLowerCase())
        );

        setSortedData(filteredData);
    }, [searchText]);
    const handleSearchChange = (event) => {
        // Update the search text when the user types in the search input
        setSearchText(event.target.value);
    };
    if (!isClient) {
        // Return a placeholder or loading indicator when rendering on the server
        return <div>Loading...</div>;
    }

    return (
        <div className="ml-24 mr-24 mt-4">
            <div className="m-2">
                <label htmlFor="sortField" className="mr-2">Sort by:</label>
                <select
                    className="bg-purple-200 mr-4"
                    id="sortField"
                    name="sortField"
                    value={sortField}
                    onChange={handleSortChange}
                >
                    <option value="bank">Bank</option>
                    <option value="name">Name</option>
                    <option value="interestRate">Interest Rate</option>
                    <option value="fee">Processing fee</option>
                    <option value="tenure">Tenure</option>
                </select>
                <label htmlFor="sortDirection mr-4">Direction:</label>
                <select
                    className="bg-purple-200 mr-4 ml-2" // Add margin-left to create space
                    id="sortDirection"
                    name="sortDirection"
                    value={sortDirection}
                    onChange={handleSortChange}
                >
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                </select>
                
                <label htmlFor="searchText" className="mr-2">Search:</label>
                <input
                    type="text"
                    id="searchText"
                    name="searchText"
                    value={searchText}
                    onChange={handleSearchChange}
                    className="search-input bg-purple-200"
                />
                
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
    );
};

export default Table;
