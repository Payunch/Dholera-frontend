import React from "react";

const CompanyList = ({
  CompanyNameList = [],
  AcYear = [],
  DefYear,
  defaultCompany,
  setPrevAcYearCompany,
  handleOnARDClose,
}) => {
  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-lg font-bold">Select company / accounting year</h2>
        <p className="text-sm text-slate-500">
          Default company: {defaultCompany || "N/A"}
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Companies
          </h3>
          <ul className="space-y-2 rounded-xl border border-slate-200 p-3">
            {CompanyNameList.length > 0 ? (
              CompanyNameList.map((company, index) => (
                <li key={`${company?.CompanyName || company?.name || index}`}>
                  <button
                    type="button"
                    className="w-full rounded-lg px-3 py-2 text-left text-sm hover:bg-slate-100"
                    onClick={() => {
                      if (setPrevAcYearCompany) {
                        setPrevAcYearCompany(company);
                      }
                      if (handleOnARDClose) {
                        handleOnARDClose();
                      }
                    }}
                  >
                    {company?.CompanyName || company?.name || `Company ${index + 1}`}
                  </button>
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-sm text-slate-500">No companies found.</li>
            )}
          </ul>
        </div>

        <div>
          <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-slate-500">
            Accounting Years
          </h3>
          <ul className="space-y-2 rounded-xl border border-slate-200 p-3">
            {AcYear.length > 0 ? (
              AcYear.map((year, index) => (
                <li key={`${year?.FullACY || year?.year || index}`} className="px-3 py-2 text-sm">
                  {year?.FullACY || year?.year || String(year)}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-sm text-slate-500">
                Default year: {DefYear || "N/A"}
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CompanyList;