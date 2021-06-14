import IconInput from "components/Input/IconInput";
import React, { useEffect, useState } from "react";
import { Field, reduxForm, isDirty, formValueSelector } from "redux-form";
import { FORM_KEY_JOB_SEARCH } from "state/reducers/formReducer";
import "./JobSelectAdvance.scss";
import { SearchOutlined } from "@ant-design/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import SelectWithSearch from "components/SelectWithSearch/SelectWithSearch";
import qs from "query-string";
import { connect, useDispatch, useSelector } from "react-redux";
import { GET_JOB_DOMAIN } from "state/reducers/jobDomainReducer";
import { useTranslation } from "react-i18next";
 
function JobSelectAdvance({ handleSubmit }) {
  const { t } = useTranslation();

  const [state, setState] = useState({
    loading: false,
    fetch: false,
    jobDomains: []
  });

  const { loading, fetch, jobDomains } = state;

  const dispatch = useDispatch();
  const provinces = useSelector((state) => state.cv.provinces);
  const domains = useSelector((state) => state.jobDomain.domains);

  const options = provinces.map(({ province_id, province_name }) => ({
    value: province_id,
    label: province_name
  }));

  useEffect(() => {
    if (!domains.length) {
      dispatch({ type: GET_JOB_DOMAIN });
      setState((curState) => ({ ...curState, loading: true }));
    } else {
      setState((curState) => ({
        ...curState,
        jobDomains: domains.map(({ id, name }) => ({ value: id, label: name }))
      }));
    }
  }, []);

  if (!fetch) {
    if (domains.length && loading) {
      setState((curState) => ({
        ...curState,
        loading: false,
        fetch: true,
        jobDomains: domains.map(({ id, name }) => ({ value: id, label: name }))
      }));
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-sm-10">
          <Field
            component={CustomSelect}
            name="job_title"
            className="col-sm-6 pr-10"
            placeholder={t("findJobSignIn.role")}
            options={jobDomains}
            icon={<SearchOutlined style={{ color: "#555" }} />}
            isClearable={true}
          />
          <Field
            component={CustomSelect}
            name="location"
            className="col-sm-6"
            placeholder={t("findJobSignIn.findLocation")}
            options={options}
            icon={<FontAwesomeIcon icon={faMapMarkerAlt} color="#555" />}
            isClearable={true}
          />
        </div>
        <div className="col-sm-2">
          <button
            type="submit"
            className="btn btn-primary btn-full-width"
            style={{ fontWeight: 700 }}
          >
            <SearchOutlined style={{ marginRight: "10px" }} />
            Find Jobs
          </button>
        </div>
      </div>
    </form>
  );
}

JobSelectAdvance = reduxForm({
  form: FORM_KEY_JOB_SEARCH,
  touchOnBlur: false,
  enableReinitialize: true,
  keepDirtyOnReinitialize: true
})(JobSelectAdvance);

JobSelectAdvance = connect(
  (
    state,
    {
      history: {
        location: { search }
      }
    }
  ) => {
    let { q, location } = qs.parse(search.substring(1));
    const { provinces } = state.cv;
    const { domains } = state.jobDomain;

    if (provinces.length) {
      if (location) {
        const { province_id, province_name } = provinces.find(
          (e) => e.province_id === location
        );
        location = { value: province_id, label: province_name };
      }
    }

    if (domains.length) {
      if (q) {
        const { id, name } = domains.find((e) => e.id === parseInt(q));
        q = { value: id, label: name };
      }
    }

    const initialValues = {
      job_title: q,
      location
    };

    return {
      initialValues
    };
  }
)(JobSelectAdvance);

export default JobSelectAdvance;

const CustomSelect = ({ input, ...props }) => (
  <SelectWithSearch
    selectedOption={input.value}
    onChange={input.onChange}
    {...props}
  />
);
