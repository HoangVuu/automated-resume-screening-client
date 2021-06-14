import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { SearchOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import qs from "query-string";
import AutoSuggest from "react-autosuggest";

import { useDispatch, useSelector } from "react-redux";
import { getSoftSkill } from "services/hrJobServices";
import { GET_SOFT_SKILL } from "state/reducers/jobDomainReducer";
import { toastErr, toast } from "utils/index";
import Loading from "components/Loading/Loading";
import { Button } from "antd";

import "./AddSoftSkillSuggest.scss";
import { useTranslation } from "react-i18next";

function AddSoftSkillSuggest({ handleAddSoft, isAddSoft, isCorner = false }) {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();

  const skillsData = useSelector((state) => state.jobDomain.softSkills);

  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([]);

  const [softValue, setSoftValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const lowerCasedCompanies = skills.map((skill) => {
    return {
      id: skill.id,
      name: skill.name.toLowerCase()
    };
  });

  const getSuggestions = (value) => {
    return lowerCasedCompanies.filter((skill) =>
      skill.name.includes(value.trim().toLowerCase())
    );
  };

  // When suggestion is clicked, Autosuggest needs to populate the input
  // based on the clicked suggestion. Teach Autosuggest how to calculate the
  // input value for every given suggestion.
  const getSuggestionValue = (suggestion) => suggestion.name;

  // Use your imagination to render suggestions.
  const renderSuggestion = (suggestion) => <span>{suggestion.name}</span>;

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  const onSuggestionsFetchRequested = ({ value }) => {
    setSoftValue(value);
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => setSuggestions([]);

  const onSuggestionSelected = (_, { suggestionValue }) => {
    console.log("Selected: " + suggestionValue);
  };

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: t("profile.addSkillPlace"),
    value: softValue,
    onChange: (_, { newValue, method }) => {
      setSoftValue(newValue);
    }
  };

  const handleClearClick = () => {
    setSoftValue("");
  };

  let clearButton;
  if (softValue.length >= 1) {
    clearButton = (
      <button
        className="close-icon explore-look__close"
        onClick={handleClearClick}
      >
        <CloseOutlined />
      </button>
    );
  }

  if (isAddSoft) {
    softValue && setSoftValue("");
  }

  useEffect(() => {
    if (!skillsData.length) {
      dispatch({ type: GET_SOFT_SKILL });
      const fetchSkills = async () => {
        setLoading(true);
        await getSoftSkill()
          .then((res) => {
            setSkills(res.data.data);
          })
          .catch((err) => {
            toastErr(err);
          })
          .finally(() => {
            setLoading(false);
          });
      };
      fetchSkills();
    } else {
      setSkills(skillsData);
    }
  }, []);

  return (
    <div
      className="add-suggest row"
      style={{ marginLeft: "0", justifyContent: "space-between" }}
    >
      <Loading loading={loading} />

      <div
        className="col-lg add-suggest__input row"
        style={{ "--border": isCorner ? "0px" : "40px" }}
      >
        <div className="input-icon">
          <SearchOutlined className="add-suggest__search" />
        </div>
        <AutoSuggest
          suggestions={suggestions}
          onSuggestionsClearRequested={onSuggestionsClearRequested}
          onSuggestionsFetchRequested={onSuggestionsFetchRequested}
          onSuggestionSelected={onSuggestionSelected}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          highlightFirstSuggestion={true}
        />
        <div className="close-icon-container">{clearButton}</div>
      </div>

      <button
        className="add-suggest__btn"
        type="primary"
        size="large"
        // disabled={!value}
        icon={<PlusOutlined />}
        onClick={handleAddSoft(softValue)}
      >
        Add skill
      </button>
    </div>
  );
}

export default AddSoftSkillSuggest;
