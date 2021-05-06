import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { SearchOutlined, CloseOutlined, PlusOutlined } from "@ant-design/icons";
import qs from "query-string";
import AutoSuggest from "react-autosuggest";

import { connect, useDispatch, useSelector } from "react-redux";
import { getJobDomain, getJobSkill } from "services/hrJobServices";
import { GET_JOB_SKILL } from "state/reducers/jobDomainReducer";
import { toastErr, toast } from "utils/index";
import ContentLoader from "react-content-loader";
import Loading from "components/Loading/Loading";
import { Button } from "antd";

import "./AddSkillSuggest.scss";

const a = [
  {
    id: 7806,
    name: "2d artist"
  },
  {
    id: 7807,
    name: "2d characters"
  },
  {
    id: 7808,
    name: "2d textures"
  },
  {
    id: 7809,
    name: "3 layers"
  },
  {
    id: 7810,
    name: "3d characters"
  },
  {
    id: 7811,
    name: "3d environmental objects"
  },
  {
    id: 7812,
    name: "3d hard surface modeling"
  },
  {
    id: 7813,
    name: "3g"
  },
  {
    id: 7814,
    name: "8base"
  },
  {
    id: 7815,
    name: "k-nearest neighbour"
  },
  {
    id: 7816,
    name: ".net"
  },
  {
    id: 7817,
    name: "a-frame"
  }
];

function AddSkillSuggest({ handleAdd }) {
  const dispatch = useDispatch();

  const skillsData = useSelector((state) => state.jobDomain.skills);

  const [loading, setLoading] = useState(false);
  const [skills, setSkills] = useState([]);

  const [value, setValue] = useState("");
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
    console.log(value);
    setValue(value);
    setSuggestions(getSuggestions(value));
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  const onSuggestionsClearRequested = () => setSuggestions([]);

  const onSuggestionSelected = (_, { suggestionValue }) => {
    console.log("Selected: " + suggestionValue);
  };

  // Autosuggest will pass through all these props to the input.
  const inputProps = {
    placeholder: "Add skill...",
    value: value,
    onChange: (_, { newValue, method }) => {
      setValue(newValue);
    }
  };

  const handleClearClick = () => {
    setValue("");
  };

  let clearButton;
  if (value.length >= 1) {
    clearButton = (
      <button
        className="close-icon explore-look__close"
        onClick={handleClearClick}
      >
        <CloseOutlined />
      </button>
    );
  }

  useEffect(() => {
    if (!skillsData.length) {
      dispatch({ type: GET_JOB_SKILL });
      const fetchSkills = async () => {
        setLoading(true);
        await getJobSkill()
          .then((res) => {
            setSkills(res.data.data);
            console.log("data", res);
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

      <div className="col-md-8 explore-look__input row">
        <div className="input-icon">
          <SearchOutlined className="explore-look__search" />
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
      <div className="col-6 col-md-4">
        <button
          className="explore__content__skills__add__btn"
          type="primary"
          size="large"
          // disabled={!value}
          icon={<PlusOutlined />}
          onClick={handleAdd(value)}
        >
          Add skill
        </button>
      </div>
    </div>
  );
}

export default AddSkillSuggest;
