import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { useSelector, useDispatch } from "react-redux";
import { fetchDashboardData } from "../../../core/actionCreators/dashboard";
import { getDashboardData } from "../../../core/selectors/dashboard";

export default function Admin() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDashboardData());
  }, []);

  let data = useSelector(getDashboardData);

  let usersByStatus = [
    { name: "Approved", value: 0, color: "#0088FE" },
    { name: "Rejected", value: 0, color: "#FF0000" },
    { name: "Pending", value: 0, color: "#FFBB28" },
  ];

  let postsByStatus = [
    { name: "Approved", value: 0, color: "#0088FE" },
    { name: "Rejected", value: 0, color: "#FF0000" },
    { name: "Pending", value: 0, color: "#FFBB28" },
  ];

  let usersByType = [
    { name: "Student", value: 0, color: "#FFBB28" },
    { name: "Tutor", value: 0, color: "#00C49F" },
  ];

  if (data) {
    if (data.UsersByStatus) {
      usersByStatus[0].value = data.UsersByStatus[0].value;
      usersByStatus[1].value = data.UsersByStatus[2].value;
      usersByStatus[2].value = data.UsersByStatus[1].value;
    }

    if (data.PostByStatus) {
      postsByStatus[0].value = data.PostByStatus[0].value;
      postsByStatus[1].value = data.PostByStatus[2].value;
      postsByStatus[2].value = data.PostByStatus[1].value;
    }

    if (data.UsersByType) {
      usersByType[0].value = data.UsersByType[0].value;
      usersByType[1].value = data.UsersByType[1].value;
    }
  }

  const renderLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  const onUsersByStatus = (data, index) => {
    let status;
    if (data.name == "Approved") {
      status = "101";
    } else if (data.name == "Rejected") {
      status = "102";
    } else {
      status = "100";
    }
    navigate(`/users?status=${status}`);
  };

  const onUsersByType = (data, index) => {
    let userType;
    if (data.name == "Student") {
      userType = "102";
    } else {
      userType = "101";
    }
    navigate(`/users?userType=${userType}`);
  };

  const onPostsByStatus = (data, index) => {
    let status;
    if (data.name == "Approved") {
      status = "101";
    } else if (data.name == "Rejected") {
      status = "102";
    } else {
      status = "100";
    }
    navigate(`/posts?status=${status}`);
  };

  const renderPieChart = (title, data, onClick) => {
    return (
      <Card body>
        <Card.Subtitle className="mb-2 text-muted">{title}</Card.Subtitle>
        <PieChart width={300} height={300}>
          <Pie
            data={data}
            dataKey="value"
            cx="50%"
            cy="50%"
            outerRadius={90}
            labelLine={false}
            label={renderLabel}
            onClick={onClick}
          >
            {data.map((item, index) => (
              <Cell
                style={{ cursor: "pointer" }}
                key={`cell-${index}`}
                fill={item.color}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </Card>
    );
  };

  return (
    <div>
      <Row>
        <Col className="d-flex justify-content-start">
          {renderPieChart("Users by Status", usersByStatus, onUsersByStatus)}
        </Col>
        <Col className="d-flex justify-content-center">
          {renderPieChart("Users by Type", usersByType, onUsersByType)}
        </Col>
        <Col className="d-flex justify-content-end">
          {renderPieChart("Posts by Status", postsByStatus, onPostsByStatus)}
        </Col>
      </Row>
    </div>
  );
}
