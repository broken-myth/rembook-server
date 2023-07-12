const depts: any = {
	"101": "ARCHI",
	"102": "CHL",
	"103": "CIV",
	"106": "CSE",
	"107": "EEE",
	"108": "ECE",
	"110": "ICE",
	"111": "MECH",
	"112": "MME",
	"114": "PROD",
	"201": "ARCHI",
	"202": "CHL",
	"203": "CIV",
	"206": "CSE",
	"207": "EEE",
	"208": "ECE",
	"211": "MECH",
	"212": "MME",
	"213": "PHY",
	"214": "PROD",
	"215": "DOMS",
	"216": "MATHS",
	"204": "CHEM",
};

const assignDepartment = (str: string) => {
	if (str in depts) {
		return depts[str];
	}
	return -1;
};

export default assignDepartment;
