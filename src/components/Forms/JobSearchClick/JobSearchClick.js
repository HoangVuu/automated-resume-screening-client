import "../JobSearchAdvance/JobSearchAdvance.scss";
import { SearchOutlined } from "@ant-design/icons";
import SelectWithSearch from "components/SelectWithSearch/SelectWithSearch";
import { useSelector } from "react-redux";
import qs from "query-string";
import history from "state/history";
import React, { useState } from "react";
import "../JobSearch/JobSearch.scss";
import Select from "react-select";
import { useTranslation } from "react-i18next";

function JobSearchClick() {
  const { t, i18n } = useTranslation();

  const [location, setLocation] = useState(null);
  const [job_title, setJobTile] = useState(null);

  const provinces = useSelector((state) => state.cv.provinces);
  const options = provinces.map(({ province_id, province_name }) => ({
    value: province_id,
    label: province_name
  }));

  const handleSubmit = (e) => {
    e.preventDefault();

    const filter = {
      q: job_title || null,
      location: location ? location.value : null
    };

    const query = qs.stringify(filter, { skipNull: true });

    history.push(`/find-jobs?${query}`);
  };

  return (
    <form className=" mx-auto bg-white rounded shadow-sm">
      <div className="row">
        <div className="col-sm-10">
          <div className="col-sm-6 pr-10">
            <input
              type="text"
              value={job_title}
              onChange={(e) => setJobTile(e.target.value)}
              placeholder={t("detail.enter")}
              className="form-control "
            />
          </div>
          <div className="col-sm-6">
            <Select
              options={options}
              value={location}
              onChange={(value) => setLocation(value)}
              placeholder={t("detail.location")}
              menuPosition="fixed"
              isClearable={true}
              className=""
            />
          </div>
        </div>
        <div className="col-sm-2">
          <button
            onClick={handleSubmit}
            className="btn btn-primary btn-full-width"
            style={{ fontWeight: 700 }}
          >
            <SearchOutlined style={{ marginRight: "10px" }} />
            {t("detail.find")}
          </button>
        </div>
      </div>
    </form>
  );
}
export default JobSearchClick;

const CustomSelect = ({ input, ...props }) => (
  <SelectWithSearch
    selectedOption={input.value}
    onChange={input.onChange}
    {...props}
  />
);
