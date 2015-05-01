var tests = [
	
	{
		name: 'Nested Inheritance With Reference',
		json: {"mName":"","mDecls":[{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"System","elements":[{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"Connection","elements":[],"cinPos":null,"parentUID":"c0_System","card":[0,-1],"isAbstract":true,"uid":"c0_Connection","gcard":{"interval":[0,-1],"isKeyword":false}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"connections","elements":[],"cinPos":null,"parentUID":"c0_System","card":[0,-1],"isAbstract":false,"uid":"c0_connections","gcard":{"interval":[0,-1],"isKeyword":false},"reference":{"isSet":true,"ref":{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_System","binding":"c0_System","tag":"IClaferId","isTop":false,"modName":""}},{"pid":"","inPos":null,"exp":{"sident":"c0_Connection","binding":"c0_Connection","tag":"IClaferId","isTop":false,"modName":""}}],"op":".","tag":"IFunExp"}}}}},{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e0_","inPos":null,"exp":{"exps":[{"pid":"e1_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_System","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_System"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_connections","binding":"c0_connections","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_connections"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Connection"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_Connection"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_Connection"]}},{"pid":"e2_","inPos":null,"exp":{"exps":[{"pid":"e3_","inPos":null,"exp":{"sident":"this","binding":"c0_System","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_System"]}},{"pid":"e4_","inPos":null,"exp":{"sident":"c0_Connection","binding":"c0_Connection","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Connection"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_Connection"]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"root","card":[0,-1],"isAbstract":true,"uid":"c0_System","gcard":{"interval":[0,-1],"isKeyword":false}}},{"tag":"IEClafer","iClafer":{"glCard":[1,1],"ident":"SystemX","elements":[{"tag":"IEClafer","iClafer":{"glCard":[1,1],"ident":"con1","elements":[],"cinPos":null,"parentUID":"c0_SystemX","card":[1,1],"isAbstract":false,"uid":"c0_con1","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Connection","binding":"c0_Connection","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Connection"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[1,1],"ident":"con2","elements":[],"cinPos":null,"parentUID":"c0_SystemX","card":[1,1],"isAbstract":false,"uid":"c0_con2","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Connection","binding":"c0_Connection","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Connection"]}}}}],"cinPos":null,"parentUID":"root","card":[1,1],"isAbstract":false,"uid":"c0_SystemX","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_System","binding":"c0_System","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_System"]}}}},{"tag":"IEConstraint","isHard":false,"cpexp":{"pid":"e5_","inPos":null,"exp":{"exps":[{"pid":"e6_","inPos":null,"exp":{"exps":[{"pid":"e7_","inPos":null,"exp":{"sident":"c0_SystemX","binding":"c0_SystemX","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_SystemX"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"e8_","inPos":null,"exp":{"sident":"c0_connections","binding":"c0_connections","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_connections"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Connection"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_Connection"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_Connection"]}},{"pid":"e9_","inPos":null,"exp":{"exps":[{"pid":"e10_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_SystemX","binding":"c0_SystemX","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_SystemX"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_con1","binding":"c0_con1","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_con1"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_con1"]}},{"pid":"e11_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_SystemX","binding":"c0_SystemX","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_SystemX"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_con2","binding":"c0_con2","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_con2"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_con2"]}}],"op":"++","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_con1","c0_con2"]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}},{"tag":"IEClafer","iClafer":{"glCard":[1,1],"ident":"SystemY","elements":[{"tag":"IEClafer","iClafer":{"glCard":[1,1],"ident":"con3","elements":[],"cinPos":null,"parentUID":"c0_SystemY","card":[1,1],"isAbstract":false,"uid":"c0_con3","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Connection","binding":"c0_Connection","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Connection"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[1,1],"ident":"con4","elements":[],"cinPos":null,"parentUID":"c0_SystemY","card":[1,1],"isAbstract":false,"uid":"c0_con4","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Connection","binding":"c0_Connection","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Connection"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[1,1],"ident":"con5","elements":[],"cinPos":null,"parentUID":"c0_SystemY","card":[1,1],"isAbstract":false,"uid":"c0_con5","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Connection","binding":"c0_Connection","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Connection"]}}}}],"cinPos":null,"parentUID":"root","card":[1,1],"isAbstract":false,"uid":"c0_SystemY","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_System","binding":"c0_System","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_System"]}}}},{"tag":"IEConstraint","isHard":false,"cpexp":{"pid":"e12_","inPos":null,"exp":{"exps":[{"pid":"e13_","inPos":null,"exp":{"exps":[{"pid":"e14_","inPos":null,"exp":{"sident":"c0_SystemY","binding":"c0_SystemY","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_SystemY"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"e15_","inPos":null,"exp":{"sident":"c0_connections","binding":"c0_connections","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_connections"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Connection"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_Connection"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_Connection"]}},{"pid":"e16_","inPos":null,"exp":{"exps":[{"pid":"e17_","inPos":null,"exp":{"exps":[{"pid":"e18_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_SystemY","binding":"c0_SystemY","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_SystemY"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_con3","binding":"c0_con3","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_con3"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_con3"]}},{"pid":"e19_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_SystemY","binding":"c0_SystemY","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_SystemY"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_con4","binding":"c0_con4","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_con4"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_con4"]}}],"op":"++","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_con3","c0_con4"]}},{"pid":"e20_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_SystemY","binding":"c0_SystemY","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_SystemY"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_con5","binding":"c0_con5","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_con5"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_con5"]}}],"op":"++","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_con3","c0_con4","c0_con5"]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}]}
		

	},
	{
		name: 'Nested Inheritance And Reference 2',
		json: {"mName":"","mDecls":[{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"Component","elements":[{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"Port","elements":[{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"input","elements":[],"cinPos":null,"parentUID":"c0_Port","card":[0,1],"isAbstract":false,"uid":"c0_input","gcard":{"interval":[0,-1],"isKeyword":false}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"output","elements":[],"cinPos":null,"parentUID":"c0_Port","card":[0,1],"isAbstract":false,"uid":"c0_output","gcard":{"interval":[0,-1],"isKeyword":false}}}],"cinPos":null,"parentUID":"c0_Component","card":[0,-1],"isAbstract":true,"uid":"c0_Port","gcard":{"interval":[1,-1],"isKeyword":true}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"TemperaturePort","elements":[],"cinPos":null,"parentUID":"c0_Component","card":[0,-1],"isAbstract":true,"uid":"c0_TemperaturePort","gcard":{"interval":[1,-1],"isKeyword":true},"reference":{"isSet":true,"ref":{"pid":"","inPos":null,"exp":{"sident":"integer","binding":"integer","tag":"IClaferId","isTop":true,"modName":""}}},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Port","binding":"c0_Port","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Port"]}}}}],"cinPos":null,"parentUID":"root","card":[0,-1],"isAbstract":true,"uid":"c0_Component","gcard":{"interval":[0,-1],"isKeyword":false}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"TemperatureConnector","elements":[{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"from","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e0_","inPos":null,"exp":{"bpexp":{"pid":"e1_","inPos":null,"exp":{"exps":[{"pid":"e2_","inPos":null,"exp":{"sident":"this","binding":"c0_from","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_from"]}},{"pid":"e3_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"ref","binding":"c0_output","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_TemperaturePort"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_output","binding":"c0_from","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_output"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_output"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_output"]}},"oDecls":[],"quant":"ISome","tag":"IDeclPExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"c0_TemperatureConnector","card":[1,1],"isAbstract":false,"uid":"c0_from","gcard":{"interval":[0,-1],"isKeyword":false},"reference":{"isSet":true,"ref":{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_Component","binding":"c0_Component","tag":"IClaferId","isTop":false,"modName":""}},{"pid":"","inPos":null,"exp":{"sident":"c0_TemperaturePort","binding":"c0_TemperaturePort","tag":"IClaferId","isTop":false,"modName":""}}],"op":".","tag":"IFunExp"}}}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"to","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e4_","inPos":null,"exp":{"bpexp":{"pid":"e5_","inPos":null,"exp":{"exps":[{"pid":"e6_","inPos":null,"exp":{"sident":"this","binding":"c0_to","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_to"]}},{"pid":"e7_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"ref","binding":"c0_input","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_TemperaturePort"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_input","binding":"c0_to","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_input"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_input"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_input"]}},"oDecls":[],"quant":"ISome","tag":"IDeclPExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"c0_TemperatureConnector","card":[1,1],"isAbstract":false,"uid":"c0_to","gcard":{"interval":[0,-1],"isKeyword":false},"reference":{"isSet":true,"ref":{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_Component","binding":"c0_Component","tag":"IClaferId","isTop":false,"modName":""}},{"pid":"","inPos":null,"exp":{"sident":"c0_TemperaturePort","binding":"c0_TemperaturePort","tag":"IClaferId","isTop":false,"modName":""}}],"op":".","tag":"IFunExp"}}}}},{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e8_","inPos":null,"exp":{"exps":[{"pid":"e9_","inPos":null,"exp":{"exps":[{"pid":"e10_","inPos":null,"exp":{"exps":[{"pid":"e11_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_TemperatureConnector","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_TemperatureConnector"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_to","binding":"c0_to","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_to"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_to"]}},{"pid":"e12_","inPos":null,"exp":{"sident":"ref","binding":"c0_to","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_TemperaturePort"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_TemperaturePort"]}},{"pid":"e13_","inPos":null,"exp":{"sident":"ref","binding":"c0_to","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e14_","inPos":null,"exp":{"exps":[{"pid":"e15_","inPos":null,"exp":{"exps":[{"pid":"e16_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_TemperatureConnector","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_TemperatureConnector"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_from","binding":"c0_from","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_from"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_from"]}},{"pid":"e17_","inPos":null,"exp":{"sident":"ref","binding":"c0_from","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_TemperaturePort"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_TemperaturePort"]}},{"pid":"e18_","inPos":null,"exp":{"sident":"ref","binding":"c0_from","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"root","card":[0,-1],"isAbstract":true,"uid":"c0_TemperatureConnector","gcard":{"interval":[0,-1],"isKeyword":false}}},{"tag":"IEClafer","iClafer":{"glCard":[1,1],"ident":"sensor","elements":[{"tag":"IEClafer","iClafer":{"glCard":[1,1],"ident":"temperature","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e19_","inPos":null,"exp":{"bpexp":{"pid":"e20_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_temperature","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_temperature"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_output","binding":"c0_output","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_output"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_output"]}},"oDecls":[],"quant":"ISome","tag":"IDeclPExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"c0_sensor","card":[1,1],"isAbstract":false,"uid":"c0_temperature","gcard":{"interval":[1,-1],"isKeyword":true},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_TemperaturePort","binding":"c0_TemperaturePort","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_TemperaturePort"]}}}}],"cinPos":null,"parentUID":"root","card":[1,1],"isAbstract":false,"uid":"c0_sensor","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Component","binding":"c0_Component","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Component"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[1,1],"ident":"controller","elements":[{"tag":"IEClafer","iClafer":{"glCard":[1,1],"ident":"temperature","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e21_","inPos":null,"exp":{"bpexp":{"pid":"e22_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c1_temperature","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c1_temperature"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_input","binding":"c0_input","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_input"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_input"]}},"oDecls":[],"quant":"ISome","tag":"IDeclPExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"c0_controller","card":[1,1],"isAbstract":false,"uid":"c1_temperature","gcard":{"interval":[1,-1],"isKeyword":true},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_TemperaturePort","binding":"c0_TemperaturePort","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_TemperaturePort"]}}}}],"cinPos":null,"parentUID":"root","card":[1,1],"isAbstract":false,"uid":"c0_controller","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Component","binding":"c0_Component","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Component"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[1,1],"ident":"con1","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e23_","inPos":null,"exp":{"exps":[{"pid":"e24_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_con1","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_con1"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_from","binding":"c0_from","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_from"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_TemperaturePort"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_TemperaturePort"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_TemperaturePort"]}},{"pid":"e25_","inPos":null,"exp":{"exps":[{"pid":"e26_","inPos":null,"exp":{"sident":"c0_sensor","binding":"c0_sensor","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_sensor"]}},{"pid":"e27_","inPos":null,"exp":{"sident":"c0_temperature","binding":"c0_temperature","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_temperature"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_temperature"]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}},{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e28_","inPos":null,"exp":{"exps":[{"pid":"e29_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_con1","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_con1"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_to","binding":"c0_to","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_to"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_TemperaturePort"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_TemperaturePort"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_TemperaturePort"]}},{"pid":"e30_","inPos":null,"exp":{"exps":[{"pid":"e31_","inPos":null,"exp":{"sident":"c0_controller","binding":"c0_controller","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_controller"]}},{"pid":"e32_","inPos":null,"exp":{"sident":"c1_temperature","binding":"c1_temperature","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c1_temperature"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c1_temperature"]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"root","card":[1,1],"isAbstract":false,"uid":"c0_con1","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_TemperatureConnector","binding":"c0_TemperatureConnector","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_TemperatureConnector"]}}}},{"tag":"IEConstraint","isHard":false,"cpexp":{"pid":"e33_","inPos":null,"exp":{"exps":[{"pid":"e34_","inPos":null,"exp":{"exps":[{"pid":"e35_","inPos":null,"exp":{"exps":[{"pid":"e36_","inPos":null,"exp":{"sident":"c0_controller","binding":"c0_controller","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_controller"]}},{"pid":"e37_","inPos":null,"exp":{"sident":"c1_temperature","binding":"c1_temperature","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c1_temperature"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c1_temperature"]}},{"pid":"e38_","inPos":null,"exp":{"sident":"ref","binding":"c1_temperature","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e39_","inPos":null,"exp":{"exps":[{"pid":"e40_","inPos":null,"exp":{"exps":[{"pid":"e41_","inPos":null,"exp":{"sident":"c0_sensor","binding":"c0_sensor","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_sensor"]}},{"pid":"e42_","inPos":null,"exp":{"sident":"c0_temperature","binding":"c0_temperature","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_temperature"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_temperature"]}},{"pid":"e43_","inPos":null,"exp":{"sident":"ref","binding":"c0_temperature","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}]}
		

	},
	

	{
		name: 'PersonStudent',
		json: 
		{
  		"mName": "",
	    "mDecls": [
	        {
	            "tag": "IEClafer",
	            "iClafer": {
	                "glCard": [
	                    0,
	                    -1
	                ],
	                "ident": "Person",
	                "elements": [
	                    {
	                        "tag": "IEClafer",
	                        "iClafer": {
	                            "glCard": [
	                                0,
	                                -1
	                            ],
	                            "ident": "age",
	                            "elements": [],
	                            "cinPos": null,
	                            "parentUID": "c0_Person",
	                            "card": [
	                                1,
	                                1
	                            ],
	                            "isAbstract": false,
	                            "uid": "c0_age",
	                            "gcard": {
	                                "interval": [
	                                    0,
	                                    -1
	                                ],
	                                "isKeyword": false
	                            },
	                            "reference": {
	                                "isSet": true,
	                                "ref": {
	                                    "pid": "",
	                                    "inPos": null,
	                                    "exp": {
	                                        "sident": "integer",
	                                        "binding": "integer",
	                                        "tag": "IClaferId",
	                                        "isTop": true,
	                                        "modName": ""
	                                    }
	                                }
	                            }
	                        }
	                    },
	                    {
	                        "tag": "IEClafer",
	                        "iClafer": {
	                            "glCard": [
	                                0,
	                                -1
	                            ],
	                            "ident": "spouse",
	                            "elements": [],
	                            "cinPos": null,
	                            "parentUID": "c0_Person",
	                            "card": [
	                                0,
	                                1
	                            ],
	                            "isAbstract": false,
	                            "uid": "c0_spouse",
	                            "gcard": {
	                                "interval": [
	                                    0,
	                                    -1
	                                ],
	                                "isKeyword": false
	                            },
	                            "reference": {
	                                "isSet": true,
	                                "ref": {
	                                    "pid": "",
	                                    "inPos": null,
	                                    "exp": {
	                                        "sident": "c0_Person",
	                                        "binding": "c0_Person",
	                                        "tag": "IClaferId",
	                                        "isTop": false,
	                                        "modName": ""
	                                    }
	                                }
	                            }
	                        }
	                    },
	                    {
	                        "tag": "IEClafer",
	                        "iClafer": {
	                            "glCard": [
	                                0,
	                                -1
	                            ],
	                            "ident": "Head",
	                            "elements": [],
	                            "cinPos": null,
	                            "parentUID": "c0_Person",
	                            "card": [
	                                0,
	                                -1
	                            ],
	                            "isAbstract": true,
	                            "uid": "c0_Head",
	                            "gcard": {
	                                "interval": [
	                                    0,
	                                    -1
	                                ],
	                                "isKeyword": false
	                            }
	                        }
	                    }
	                ],
	                "cinPos": null,
	                "parentUID": "root",
	                "card": [
	                    0,
	                    -1
	                ],
	                "isAbstract": true,
	                "uid": "c0_Person",
	                "gcard": {
	                    "interval": [
	                        0,
	                        -1
	                    ],
	                    "isKeyword": false
	                }
	            }
	        },
	        {
	            "tag": "IEClafer",
	            "iClafer": {
	                "glCard": [
	                    0,
	                    -1
	                ],
	                "ident": "Student",
	                "elements": [],
	                "cinPos": null,
	                "parentUID": "root",
	                "card": [
	                    0,
	                    -1
	                ],
	                "isAbstract": true,
	                "uid": "c0_Student",
	                "gcard": {
	                    "interval": [
	                        0,
	                        -1
	                    ],
	                    "isKeyword": false
	                },
	                "super": {
	                    "pid": "",
	                    "inPos": null,
	                    "exp": {
	                        "sident": "c0_Person",
	                        "binding": "c0_Person",
	                        "tag": "IClaferId",
	                        "isTop": true,
	                        "modName": ""
	                    },
	                    "iType": {
	                        "tag": "TClafer",
	                        "contents": [
	                            "c0_Person"
	                        ]
	                    }
	                }
	            }
	        },
	        {
	            "tag": "IEClafer",
	            "iClafer": {
	                "glCard": [
	                    1,
	                    1
	                ],
	                "ident": "Alice",
	                "elements": [
	                    {
	                        "tag": "IEConstraint",
	                        "isHard": true,
	                        "cpexp": {
	                            "pid": "e0_",
	                            "inPos": null,
	                            "exp": {
	                                "exps": [
	                                    {
	                                        "pid": "e1_",
	                                        "inPos": null,
	                                        "exp": {
	                                            "exps": [
	                                                {
	                                                    "pid": "",
	                                                    "inPos": null,
	                                                    "exp": {
	                                                        "sident": "this",
	                                                        "binding": "c0_Alice",
	                                                        "tag": "IClaferId",
	                                                        "isTop": true,
	                                                        "modName": ""
	                                                    },
	                                                    "iType": {
	                                                        "tag": "TClafer",
	                                                        "contents": [
	                                                            "c0_Alice"
	                                                        ]
	                                                    }
	                                                },
	                                                {
	                                                    "pid": "",
	                                                    "inPos": null,
	                                                    "exp": {
	                                                        "exps": [
	                                                            {
	                                                                "pid": "",
	                                                                "inPos": null,
	                                                                "exp": {
	                                                                    "sident": "c0_age",
	                                                                    "binding": "c0_age",
	                                                                    "tag": "IClaferId",
	                                                                    "isTop": false,
	                                                                    "modName": ""
	                                                                },
	                                                                "iType": {
	                                                                    "tag": "TClafer",
	                                                                    "contents": [
	                                                                        "c0_age"
	                                                                    ]
	                                                                }
	                                                            },
	                                                            {
	                                                                "pid": "",
	                                                                "inPos": null,
	                                                                "exp": {
	                                                                    "sident": "ref",
	                                                                    "binding": null,
	                                                                    "tag": "IClaferId",
	                                                                    "isTop": true,
	                                                                    "modName": ""
	                                                                },
	                                                                "iType": {
	                                                                    "tag": "TInteger",
	                                                                    "contents": []
	                                                                }
	                                                            }
	                                                        ],
	                                                        "op": ".",
	                                                        "tag": "IFunExp"
	                                                    },
	                                                    "iType": {
	                                                        "tag": "TInteger",
	                                                        "contents": []
	                                                    }
	                                                }
	                                            ],
	                                            "op": ".",
	                                            "tag": "IFunExp"
	                                        },
	                                        "iType": {
	                                            "tag": "TInteger",
	                                            "contents": []
	                                        }
	                                    },
	                                    {
	                                        "pid": "e2_",
	                                        "inPos": null,
	                                        "exp": {
	                                            "iint": 20,
	                                            "tag": "IInt"
	                                        },
	                                        "iType": {
	                                            "tag": "TInteger",
	                                            "contents": []
	                                        }
	                                    }
	                                ],
	                                "op": "=",
	                                "tag": "IFunExp"
	                            },
	                            "iType": {
	                                "tag": "TBoolean",
	                                "contents": []
	                            }
	                        }
	                    },
	                    {
	                        "tag": "IEConstraint",
	                        "isHard": true,
	                        "cpexp": {
	                            "pid": "e3_",
	                            "inPos": null,
	                            "exp": {
	                                "exps": [
	                                    {
	                                        "pid": "e4_",
	                                        "inPos": null,
	                                        "exp": {
	                                            "exps": [
	                                                {
	                                                    "pid": "",
	                                                    "inPos": null,
	                                                    "exp": {
	                                                        "sident": "this",
	                                                        "binding": "c0_Alice",
	                                                        "tag": "IClaferId",
	                                                        "isTop": true,
	                                                        "modName": ""
	                                                    },
	                                                    "iType": {
	                                                        "tag": "TClafer",
	                                                        "contents": [
	                                                            "c0_Alice"
	                                                        ]
	                                                    }
	                                                },
	                                                {
	                                                    "pid": "",
	                                                    "inPos": null,
	                                                    "exp": {
	                                                        "exps": [
	                                                            {
	                                                                "pid": "",
	                                                                "inPos": null,
	                                                                "exp": {
	                                                                    "sident": "c0_spouse",
	                                                                    "binding": "c0_spouse",
	                                                                    "tag": "IClaferId",
	                                                                    "isTop": false,
	                                                                    "modName": ""
	                                                                },
	                                                                "iType": {
	                                                                    "tag": "TClafer",
	                                                                    "contents": [
	                                                                        "c0_spouse"
	                                                                    ]
	                                                                }
	                                                            },
	                                                            {
	                                                                "pid": "",
	                                                                "inPos": null,
	                                                                "exp": {
	                                                                    "sident": "ref",
	                                                                    "binding": null,
	                                                                    "tag": "IClaferId",
	                                                                    "isTop": true,
	                                                                    "modName": ""
	                                                                },
	                                                                "iType": {
	                                                                    "tag": "TClafer",
	                                                                    "contents": [
	                                                                        "c0_Person"
	                                                                    ]
	                                                                }
	                                                            }
	                                                        ],
	                                                        "op": ".",
	                                                        "tag": "IFunExp"
	                                                    },
	                                                    "iType": {
	                                                        "tag": "TClafer",
	                                                        "contents": [
	                                                            "c0_Person"
	                                                        ]
	                                                    }
	                                                }
	                                            ],
	                                            "op": ".",
	                                            "tag": "IFunExp"
	                                        },
	                                        "iType": {
	                                            "tag": "TClafer",
	                                            "contents": [
	                                                "c0_Person"
	                                            ]
	                                        }
	                                    },
	                                    {
	                                        "pid": "e5_",
	                                        "inPos": null,
	                                        "exp": {
	                                            "sident": "c0_Bob",
	                                            "binding": "c0_Bob",
	                                            "tag": "IClaferId",
	                                            "isTop": true,
	                                            "modName": ""
	                                        },
	                                        "iType": {
	                                            "tag": "TClafer",
	                                            "contents": [
	                                                "c0_Bob"
	                                            ]
	                                        }
	                                    }
	                                ],
	                                "op": "=",
	                                "tag": "IFunExp"
	                            },
	                            "iType": {
	                                "tag": "TBoolean",
	                                "contents": []
	                            }
	                        }
	                    },
	                    {
	                        "tag": "IEClafer",
	                        "iClafer": {
	                            "glCard": [
	                                1,
	                                1
	                            ],
	                            "ident": "studentId",
	                            "elements": [],
	                            "cinPos": null,
	                            "parentUID": "c0_Alice",
	                            "card": [
	                                1,
	                                1
	                            ],
	                            "isAbstract": false,
	                            "uid": "c0_studentId",
	                            "gcard": {
	                                "interval": [
	                                    0,
	                                    -1
	                                ],
	                                "isKeyword": false
	                            },
	                            "reference": {
	                                "isSet": true,
	                                "ref": {
	                                    "pid": "",
	                                    "inPos": null,
	                                    "exp": {
	                                        "sident": "string",
	                                        "binding": "string",
	                                        "tag": "IClaferId",
	                                        "isTop": true,
	                                        "modName": ""
	                                    }
	                                }
	                            }
	                        }
	                    },
	                    {
	                        "tag": "IEConstraint",
	                        "isHard": true,
	                        "cpexp": {
	                            "pid": "e6_",
	                            "inPos": null,
	                            "exp": {
	                                "exps": [
	                                    {
	                                        "pid": "e7_",
	                                        "inPos": null,
	                                        "exp": {
	                                            "bpexp": {
	                                                "pid": "e8_",
	                                                "inPos": null,
	                                                "exp": {
	                                                    "exps": [
	                                                        {
	                                                            "pid": "",
	                                                            "inPos": null,
	                                                            "exp": {
	                                                                "sident": "this",
	                                                                "binding": "c0_Alice",
	                                                                "tag": "IClaferId",
	                                                                "isTop": true,
	                                                                "modName": ""
	                                                            },
	                                                            "iType": {
	                                                                "tag": "TClafer",
	                                                                "contents": [
	                                                                    "c0_Alice"
	                                                                ]
	                                                            }
	                                                        },
	                                                        {
	                                                            "pid": "",
	                                                            "inPos": null,
	                                                            "exp": {
	                                                                "sident": "c0_studentId",
	                                                                "binding": "c0_studentId",
	                                                                "tag": "IClaferId",
	                                                                "isTop": false,
	                                                                "modName": ""
	                                                            },
	                                                            "iType": {
	                                                                "tag": "TClafer",
	                                                                "contents": [
	                                                                    "c0_studentId"
	                                                                ]
	                                                            }
	                                                        }
	                                                    ],
	                                                    "op": ".",
	                                                    "tag": "IFunExp"
	                                                },
	                                                "iType": {
	                                                    "tag": "TClafer",
	                                                    "contents": [
	                                                        "c0_studentId"
	                                                    ]
	                                                }
	                                            },
	                                            "oDecls": [],
	                                            "quant": "ISome",
	                                            "tag": "IDeclPExp"
	                                        },
	                                        "iType": {
	                                            "tag": "TBoolean",
	                                            "contents": []
	                                        }
	                                    },
	                                    {
	                                        "pid": "e9_",
	                                        "inPos": null,
	                                        "exp": {
	                                            "exps": [
	                                                {
	                                                    "pid": "e10_",
	                                                    "inPos": null,
	                                                    "exp": {
	                                                        "exps": [
	                                                            {
	                                                                "pid": "",
	                                                                "inPos": null,
	                                                                "exp": {
	                                                                    "sident": "this",
	                                                                    "binding": "c0_Alice",
	                                                                    "tag": "IClaferId",
	                                                                    "isTop": true,
	                                                                    "modName": ""
	                                                                },
	                                                                "iType": {
	                                                                    "tag": "TClafer",
	                                                                    "contents": [
	                                                                        "c0_Alice"
	                                                                    ]
	                                                                }
	                                                            },
	                                                            {
	                                                                "pid": "",
	                                                                "inPos": null,
	                                                                "exp": {
	                                                                    "exps": [
	                                                                        {
	                                                                            "pid": "",
	                                                                            "inPos": null,
	                                                                            "exp": {
	                                                                                "sident": "c0_studentId",
	                                                                                "binding": "c0_studentId",
	                                                                                "tag": "IClaferId",
	                                                                                "isTop": false,
	                                                                                "modName": ""
	                                                                            },
	                                                                            "iType": {
	                                                                                "tag": "TClafer",
	                                                                                "contents": [
	                                                                                    "c0_studentId"
	                                                                                ]
	                                                                            }
	                                                                        },
	                                                                        {
	                                                                            "pid": "",
	                                                                            "inPos": null,
	                                                                            "exp": {
	                                                                                "sident": "ref",
	                                                                                "binding": null,
	                                                                                "tag": "IClaferId",
	                                                                                "isTop": true,
	                                                                                "modName": ""
	                                                                            },
	                                                                            "iType": {
	                                                                                "tag": "TString",
	                                                                                "contents": []
	                                                                            }
	                                                                        }
	                                                                    ],
	                                                                    "op": ".",
	                                                                    "tag": "IFunExp"
	                                                                },
	                                                                "iType": {
	                                                                    "tag": "TString",
	                                                                    "contents": []
	                                                                }
	                                                            }
	                                                        ],
	                                                        "op": ".",
	                                                        "tag": "IFunExp"
	                                                    },
	                                                    "iType": {
	                                                        "tag": "TString",
	                                                        "contents": []
	                                                    }
	                                                },
	                                                {
	                                                    "pid": "e11_",
	                                                    "inPos": null,
	                                                    "exp": {
	                                                        "istr": "\"s586kd0\"",
	                                                        "tag": "IStr"
	                                                    },
	                                                    "iType": {
	                                                        "tag": "TString",
	                                                        "contents": []
	                                                    }
	                                                }
	                                            ],
	                                            "op": "=",
	                                            "tag": "IFunExp"
	                                        },
	                                        "iType": {
	                                            "tag": "TBoolean",
	                                            "contents": []
	                                        }
	                                    }
	                                ],
	                                "op": "=>",
	                                "tag": "IFunExp"
	                            },
	                            "iType": {
	                                "tag": "TBoolean",
	                                "contents": []
	                            }
	                        }
	                    },
	                    {
	                        "tag": "IEClafer",
	                        "iClafer": {
	                            "glCard": [
	                                1,
	                                1
	                            ],
	                            "ident": "head",
	                            "elements": [],
	                            "cinPos": null,
	                            "parentUID": "c0_Alice",
	                            "card": [
	                                1,
	                                1
	                            ],
	                            "isAbstract": false,
	                            "uid": "c0_head",
	                            "gcard": {
	                                "interval": [
	                                    0,
	                                    -1
	                                ],
	                                "isKeyword": false
	                            },
	                            "super": {
	                                "pid": "",
	                                "inPos": null,
	                                "exp": {
	                                    "sident": "c0_Head",
	                                    "binding": "c0_Head",
	                                    "tag": "IClaferId",
	                                    "isTop": false,
	                                    "modName": ""
	                                },
	                                "iType": {
	                                    "tag": "TClafer",
	                                    "contents": [
	                                        "c0_Head"
	                                    ]
	                                }
	                            }
	                        }
	                    }
	                ],
	                "cinPos": null,
	                "parentUID": "root",
	                "card": [
	                    1,
	                    1
	                ],
	                "isAbstract": false,
	                "uid": "c0_Alice",
	                "gcard": {
	                    "interval": [
	                        0,
	                        -1
	                    ],
	                    "isKeyword": false
	                },
	                "super": {
	                    "pid": "",
	                    "inPos": null,
	                    "exp": {
	                        "sident": "c0_Student",
	                        "binding": "c0_Student",
	                        "tag": "IClaferId",
	                        "isTop": true,
	                        "modName": ""
	                    },
	                    "iType": {
	                        "tag": "TClafer",
	                        "contents": [
	                            "c0_Student",
	                            "c0_Person"
	                        ]
	                    }
	                }
	            }
	        },
	        {
	            "tag": "IEClafer",
	            "iClafer": {
	                "glCard": [
	                    1,
	                    1
	                ],
	                "ident": "Bob",
	                "elements": [
	                    {
	                        "tag": "IEConstraint",
	                        "isHard": true,
	                        "cpexp": {
	                            "pid": "e12_",
	                            "inPos": null,
	                            "exp": {
	                                "exps": [
	                                    {
	                                        "pid": "e13_",
	                                        "inPos": null,
	                                        "exp": {
	                                            "exps": [
	                                                {
	                                                    "pid": "",
	                                                    "inPos": null,
	                                                    "exp": {
	                                                        "sident": "this",
	                                                        "binding": "c0_Bob",
	                                                        "tag": "IClaferId",
	                                                        "isTop": true,
	                                                        "modName": ""
	                                                    },
	                                                    "iType": {
	                                                        "tag": "TClafer",
	                                                        "contents": [
	                                                            "c0_Bob"
	                                                        ]
	                                                    }
	                                                },
	                                                {
	                                                    "pid": "",
	                                                    "inPos": null,
	                                                    "exp": {
	                                                        "exps": [
	                                                            {
	                                                                "pid": "",
	                                                                "inPos": null,
	                                                                "exp": {
	                                                                    "sident": "c0_age",
	                                                                    "binding": "c0_age",
	                                                                    "tag": "IClaferId",
	                                                                    "isTop": false,
	                                                                    "modName": ""
	                                                                },
	                                                                "iType": {
	                                                                    "tag": "TClafer",
	                                                                    "contents": [
	                                                                        "c0_age"
	                                                                    ]
	                                                                }
	                                                            },
	                                                            {
	                                                                "pid": "",
	                                                                "inPos": null,
	                                                                "exp": {
	                                                                    "sident": "ref",
	                                                                    "binding": null,
	                                                                    "tag": "IClaferId",
	                                                                    "isTop": true,
	                                                                    "modName": ""
	                                                                },
	                                                                "iType": {
	                                                                    "tag": "TInteger",
	                                                                    "contents": []
	                                                                }
	                                                            }
	                                                        ],
	                                                        "op": ".",
	                                                        "tag": "IFunExp"
	                                                    },
	                                                    "iType": {
	                                                        "tag": "TInteger",
	                                                        "contents": []
	                                                    }
	                                                }
	                                            ],
	                                            "op": ".",
	                                            "tag": "IFunExp"
	                                        },
	                                        "iType": {
	                                            "tag": "TInteger",
	                                            "contents": []
	                                        }
	                                    },
	                                    {
	                                        "pid": "e14_",
	                                        "inPos": null,
	                                        "exp": {
	                                            "iint": 21,
	                                            "tag": "IInt"
	                                        },
	                                        "iType": {
	                                            "tag": "TInteger",
	                                            "contents": []
	                                        }
	                                    }
	                                ],
	                                "op": "=",
	                                "tag": "IFunExp"
	                            },
	                            "iType": {
	                                "tag": "TBoolean",
	                                "contents": []
	                            }
	                        }
	                    },
	                    {
	                        "tag": "IEConstraint",
	                        "isHard": true,
	                        "cpexp": {
	                            "pid": "e15_",
	                            "inPos": null,
	                            "exp": {
	                                "exps": [
	                                    {
	                                        "pid": "e16_",
	                                        "inPos": null,
	                                        "exp": {
	                                            "exps": [
	                                                {
	                                                    "pid": "",
	                                                    "inPos": null,
	                                                    "exp": {
	                                                        "sident": "this",
	                                                        "binding": "c0_Bob",
	                                                        "tag": "IClaferId",
	                                                        "isTop": true,
	                                                        "modName": ""
	                                                    },
	                                                    "iType": {
	                                                        "tag": "TClafer",
	                                                        "contents": [
	                                                            "c0_Bob"
	                                                        ]
	                                                    }
	                                                },
	                                                {
	                                                    "pid": "",
	                                                    "inPos": null,
	                                                    "exp": {
	                                                        "exps": [
	                                                            {
	                                                                "pid": "",
	                                                                "inPos": null,
	                                                                "exp": {
	                                                                    "sident": "c0_spouse",
	                                                                    "binding": "c0_spouse",
	                                                                    "tag": "IClaferId",
	                                                                    "isTop": false,
	                                                                    "modName": ""
	                                                                },
	                                                                "iType": {
	                                                                    "tag": "TClafer",
	                                                                    "contents": [
	                                                                        "c0_spouse"
	                                                                    ]
	                                                                }
	                                                            },
	                                                            {
	                                                                "pid": "",
	                                                                "inPos": null,
	                                                                "exp": {
	                                                                    "sident": "ref",
	                                                                    "binding": null,
	                                                                    "tag": "IClaferId",
	                                                                    "isTop": true,
	                                                                    "modName": ""
	                                                                },
	                                                                "iType": {
	                                                                    "tag": "TClafer",
	                                                                    "contents": [
	                                                                        "c0_Person"
	                                                                    ]
	                                                                }
	                                                            }
	                                                        ],
	                                                        "op": ".",
	                                                        "tag": "IFunExp"
	                                                    },
	                                                    "iType": {
	                                                        "tag": "TClafer",
	                                                        "contents": [
	                                                            "c0_Person"
	                                                        ]
	                                                    }
	                                                }
	                                            ],
	                                            "op": ".",
	                                            "tag": "IFunExp"
	                                        },
	                                        "iType": {
	                                            "tag": "TClafer",
	                                            "contents": [
	                                                "c0_Person"
	                                            ]
	                                        }
	                                    },
	                                    {
	                                        "pid": "e17_",
	                                        "inPos": null,
	                                        "exp": {
	                                            "sident": "c0_Alice",
	                                            "binding": "c0_Alice",
	                                            "tag": "IClaferId",
	                                            "isTop": true,
	                                            "modName": ""
	                                        },
	                                        "iType": {
	                                            "tag": "TClafer",
	                                            "contents": [
	                                                "c0_Alice"
	                                            ]
	                                        }
	                                    }
	                                ],
	                                "op": "=",
	                                "tag": "IFunExp"
	                            },
	                            "iType": {
	                                "tag": "TBoolean",
	                                "contents": []
	                            }
	                        }
	                    },
	                    {
	                        "tag": "IEClafer",
	                        "iClafer": {
	                            "glCard": [
	                                1,
	                                1
	                            ],
	                            "ident": "head",
	                            "elements": [],
	                            "cinPos": null,
	                            "parentUID": "c0_Bob",
	                            "card": [
	                                1,
	                                1
	                            ],
	                            "isAbstract": false,
	                            "uid": "c1_head",
	                            "gcard": {
	                                "interval": [
	                                    0,
	                                    -1
	                                ],
	                                "isKeyword": false
	                            },
	                            "super": {
	                                "pid": "",
	                                "inPos": null,
	                                "exp": {
	                                    "sident": "c0_Head",
	                                    "binding": "c0_Head",
	                                    "tag": "IClaferId",
	                                    "isTop": false,
	                                    "modName": ""
	                                },
	                                "iType": {
	                                    "tag": "TClafer",
	                                    "contents": [
	                                        "c0_Head"
	                                    ]
	                                }
	                            }
	                        }
	                    }
	                ],
	                "cinPos": null,
	                "parentUID": "root",
	                "card": [
	                    1,
	                    1
	                ],
	                "isAbstract": false,
	                "uid": "c0_Bob",
	                "gcard": {
	                    "interval": [
	                        0,
	                        -1
	                    ],
	                    "isKeyword": false
	                },
	                "super": {
	                    "pid": "",
	                    "inPos": null,
	                    "exp": {
	                        "sident": "c0_Person",
	                        "binding": "c0_Person",
	                        "tag": "IClaferId",
	                        "isTop": true,
	                        "modName": ""
	                    },
	                    "iType": {
	                        "tag": "TClafer",
	                        "contents": [
	                            "c0_Person"
	                        ]
	                    }
	                }
	            }
	        }
	    ]
		}
	},

	{
		name: 'Components',
		json: {"mName":"","mDecls":[{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"Component","elements":[{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"performance","elements":[],"cinPos":null,"parentUID":"c0_Component","card":[1,1],"isAbstract":false,"uid":"c0_performance","gcard":{"interval":[0,-1],"isKeyword":false},"reference":{"isSet":false,"ref":{"pid":"","inPos":null,"exp":{"sident":"integer","binding":"integer","tag":"IClaferId","isTop":true,"modName":""}}}}}],"cinPos":null,"parentUID":"root","card":[0,-1],"isAbstract":true,"uid":"c0_Component","gcard":{"interval":[0,-1],"isKeyword":false}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"ComponentWithEnergy","elements":[{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"energy","elements":[],"cinPos":null,"parentUID":"c0_ComponentWithEnergy","card":[1,1],"isAbstract":false,"uid":"c0_energy","gcard":{"interval":[0,-1],"isKeyword":false},"reference":{"isSet":false,"ref":{"pid":"","inPos":null,"exp":{"sident":"integer","binding":"integer","tag":"IClaferId","isTop":true,"modName":""}}}}}],"cinPos":null,"parentUID":"root","card":[0,-1],"isAbstract":true,"uid":"c0_ComponentWithEnergy","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Component","binding":"c0_Component","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Component"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"MobilePhone","elements":[{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"hardware","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e0_","inPos":null,"exp":{"exps":[{"pid":"e1_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_hardware","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_hardware"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_performance","binding":"c0_performance","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_performance"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e2_","inPos":null,"exp":{"iint":0,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"screen","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e3_","inPos":null,"exp":{"exps":[{"pid":"e4_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_screen","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_screen"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_performance","binding":"c0_performance","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_performance"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e5_","inPos":null,"exp":{"iint":0,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"material","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e6_","inPos":null,"exp":{"exps":[{"pid":"e7_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_material","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_material"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_performance","binding":"c0_performance","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_performance"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e8_","inPos":null,"exp":{"iint":0,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"oled","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e9_","inPos":null,"exp":{"exps":[{"pid":"e10_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_oled","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_oled"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_energy","binding":"c0_energy","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_energy"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e11_","inPos":null,"exp":{"iint":3,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}},{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e12_","inPos":null,"exp":{"exps":[{"pid":"e13_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_oled","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_oled"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_performance","binding":"c0_performance","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_performance"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e14_","inPos":null,"exp":{"exps":[{"pid":"e15_","inPos":null,"exp":{"iint":3,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"-","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"c0_material","card":[0,1],"isAbstract":false,"uid":"c0_oled","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_ComponentWithEnergy","binding":"c0_ComponentWithEnergy","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_ComponentWithEnergy"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"amoled","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e16_","inPos":null,"exp":{"exps":[{"pid":"e17_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_amoled","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_amoled"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_energy","binding":"c0_energy","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_energy"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e18_","inPos":null,"exp":{"iint":2,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}},{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e19_","inPos":null,"exp":{"exps":[{"pid":"e20_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_amoled","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_amoled"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_performance","binding":"c0_performance","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_performance"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e21_","inPos":null,"exp":{"exps":[{"pid":"e22_","inPos":null,"exp":{"iint":5,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"-","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"c0_material","card":[0,1],"isAbstract":false,"uid":"c0_amoled","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_ComponentWithEnergy","binding":"c0_ComponentWithEnergy","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_ComponentWithEnergy"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"lcd","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e23_","inPos":null,"exp":{"exps":[{"pid":"e24_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_lcd","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_lcd"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_energy","binding":"c0_energy","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_energy"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e25_","inPos":null,"exp":{"iint":4,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}},{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e26_","inPos":null,"exp":{"exps":[{"pid":"e27_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_lcd","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_lcd"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_performance","binding":"c0_performance","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_performance"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e28_","inPos":null,"exp":{"exps":[{"pid":"e29_","inPos":null,"exp":{"iint":2,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"-","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"c0_material","card":[0,1],"isAbstract":false,"uid":"c0_lcd","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_ComponentWithEnergy","binding":"c0_ComponentWithEnergy","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_ComponentWithEnergy"]}}}}],"cinPos":null,"parentUID":"c0_screen","card":[1,1],"isAbstract":false,"uid":"c0_material","gcard":{"interval":[1,1],"isKeyword":true},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Component","binding":"c0_Component","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Component"]}}}}],"cinPos":null,"parentUID":"c0_hardware","card":[1,1],"isAbstract":false,"uid":"c0_screen","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Component","binding":"c0_Component","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Component"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"keyboard","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e30_","inPos":null,"exp":{"exps":[{"pid":"e31_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_keyboard","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_keyboard"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_energy","binding":"c0_energy","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_energy"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e32_","inPos":null,"exp":{"iint":1,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}},{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e33_","inPos":null,"exp":{"exps":[{"pid":"e34_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_keyboard","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_keyboard"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_performance","binding":"c0_performance","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_performance"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e35_","inPos":null,"exp":{"iint":3,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"c0_hardware","card":[0,1],"isAbstract":false,"uid":"c0_keyboard","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_ComponentWithEnergy","binding":"c0_ComponentWithEnergy","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_ComponentWithEnergy"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"keyboardLight","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e36_","inPos":null,"exp":{"exps":[{"pid":"e37_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_keyboardLight","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_keyboardLight"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_energy","binding":"c0_energy","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_energy"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e38_","inPos":null,"exp":{"iint":2,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}},{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e39_","inPos":null,"exp":{"exps":[{"pid":"e40_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_keyboardLight","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_keyboardLight"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_performance","binding":"c0_performance","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_performance"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e41_","inPos":null,"exp":{"exps":[{"pid":"e42_","inPos":null,"exp":{"iint":1,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"-","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}},{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e43_","inPos":null,"exp":{"bpexp":{"pid":"e44_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_keyboardLight","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_keyboardLight"]}},{"pid":"","inPos":null,"exp":{"sident":"parent","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_hardware"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_hardware"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_keyboard","binding":"c0_keyboard","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_keyboard"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_keyboard"]}},"oDecls":[],"quant":"ISome","tag":"IDeclPExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"c0_hardware","card":[0,1],"isAbstract":false,"uid":"c0_keyboardLight","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_ComponentWithEnergy","binding":"c0_ComponentWithEnergy","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_ComponentWithEnergy"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"cpu","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e45_","inPos":null,"exp":{"exps":[{"pid":"e46_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_cpu","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_cpu"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_energy","binding":"c0_energy","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_energy"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e47_","inPos":null,"exp":{"iint":10,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}},{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e48_","inPos":null,"exp":{"exps":[{"pid":"e49_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_cpu","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_cpu"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_performance","binding":"c0_performance","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_performance"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e50_","inPos":null,"exp":{"iint":15,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"c0_hardware","card":[1,1],"isAbstract":false,"uid":"c0_cpu","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_ComponentWithEnergy","binding":"c0_ComponentWithEnergy","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_ComponentWithEnergy"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"extra_cpu","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e51_","inPos":null,"exp":{"exps":[{"pid":"e52_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_extra_cpu","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_extra_cpu"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_energy","binding":"c0_energy","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_energy"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e53_","inPos":null,"exp":{"iint":2,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}},{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e54_","inPos":null,"exp":{"exps":[{"pid":"e55_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_extra_cpu","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_extra_cpu"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_performance","binding":"c0_performance","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_performance"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e56_","inPos":null,"exp":{"iint":20,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"c0_hardware","card":[0,1],"isAbstract":false,"uid":"c0_extra_cpu","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_ComponentWithEnergy","binding":"c0_ComponentWithEnergy","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_ComponentWithEnergy"]}}}}],"cinPos":null,"parentUID":"c0_MobilePhone","card":[1,1],"isAbstract":false,"uid":"c0_hardware","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Component","binding":"c0_Component","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Component"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"location","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e57_","inPos":null,"exp":{"exps":[{"pid":"e58_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_location","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_location"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_performance","binding":"c0_performance","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_performance"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e59_","inPos":null,"exp":{"iint":0,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"gps","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e60_","inPos":null,"exp":{"exps":[{"pid":"e61_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_gps","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_gps"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_energy","binding":"c0_energy","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_energy"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e62_","inPos":null,"exp":{"iint":5,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}},{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e63_","inPos":null,"exp":{"exps":[{"pid":"e64_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_gps","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_gps"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_performance","binding":"c0_performance","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_performance"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e65_","inPos":null,"exp":{"exps":[{"pid":"e66_","inPos":null,"exp":{"iint":1,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"-","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"c0_location","card":[0,1],"isAbstract":false,"uid":"c0_gps","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_ComponentWithEnergy","binding":"c0_ComponentWithEnergy","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_ComponentWithEnergy"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"wifitriangulation","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e67_","inPos":null,"exp":{"exps":[{"pid":"e68_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_wifitriangulation","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_wifitriangulation"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_energy","binding":"c0_energy","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_energy"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e69_","inPos":null,"exp":{"iint":10,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}},{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e70_","inPos":null,"exp":{"exps":[{"pid":"e71_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_wifitriangulation","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_wifitriangulation"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_performance","binding":"c0_performance","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_performance"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e72_","inPos":null,"exp":{"exps":[{"pid":"e73_","inPos":null,"exp":{"iint":2,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"-","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"c0_location","card":[0,1],"isAbstract":false,"uid":"c0_wifitriangulation","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_ComponentWithEnergy","binding":"c0_ComponentWithEnergy","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_ComponentWithEnergy"]}}}}],"cinPos":null,"parentUID":"c0_MobilePhone","card":[0,1],"isAbstract":false,"uid":"c0_location","gcard":{"interval":[1,-1],"isKeyword":true},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Component","binding":"c0_Component","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Component"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"software","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e74_","inPos":null,"exp":{"exps":[{"pid":"e75_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_software","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_software"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_performance","binding":"c0_performance","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_performance"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e76_","inPos":null,"exp":{"iint":0,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"browser","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e77_","inPos":null,"exp":{"exps":[{"pid":"e78_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_browser","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_browser"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_performance","binding":"c0_performance","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_performance"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e79_","inPos":null,"exp":{"exps":[{"pid":"e80_","inPos":null,"exp":{"iint":1,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"-","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}},{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e81_","inPos":null,"exp":{"bpexp":{"pid":"e82_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_browser","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_browser"]}},{"pid":"","inPos":null,"exp":{"sident":"parent","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_software"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_software"]}},{"pid":"","inPos":null,"exp":{"sident":"parent","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_MobilePhone"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_MobilePhone"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_hardware","binding":"c0_hardware","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_hardware"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_hardware"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_extra_cpu","binding":"c0_extra_cpu","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_extra_cpu"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_extra_cpu"]}},"oDecls":[],"quant":"ISome","tag":"IDeclPExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"c0_software","card":[0,1],"isAbstract":false,"uid":"c0_browser","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Component","binding":"c0_Component","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Component"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"mediaplayer","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e83_","inPos":null,"exp":{"exps":[{"pid":"e84_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_mediaplayer","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_mediaplayer"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_performance","binding":"c0_performance","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_performance"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e85_","inPos":null,"exp":{"exps":[{"pid":"e86_","inPos":null,"exp":{"iint":2,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"-","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"c0_software","card":[0,1],"isAbstract":false,"uid":"c0_mediaplayer","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Component","binding":"c0_Component","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Component"]}}}}],"cinPos":null,"parentUID":"c0_MobilePhone","card":[1,1],"isAbstract":false,"uid":"c0_software","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Component","binding":"c0_Component","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Component"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"total_performance","elements":[],"cinPos":null,"parentUID":"c0_MobilePhone","card":[1,1],"isAbstract":false,"uid":"c0_total_performance","gcard":{"interval":[0,-1],"isKeyword":false},"reference":{"isSet":false,"ref":{"pid":"","inPos":null,"exp":{"sident":"integer","binding":"integer","tag":"IClaferId","isTop":true,"modName":""}}}}},{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e87_","inPos":null,"exp":{"exps":[{"pid":"e88_","inPos":null,"exp":{"bpexp":{"pid":"e89_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_MobilePhone","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_MobilePhone"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_total_performance","binding":"c0_total_performance","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_total_performance"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_total_performance"]}},"oDecls":[],"quant":"ISome","tag":"IDeclPExp"},"iType":{"tag":"TBoolean","contents":[]}},{"pid":"e90_","inPos":null,"exp":{"exps":[{"pid":"e91_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_MobilePhone","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_MobilePhone"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_total_performance","binding":"c0_total_performance","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_total_performance"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e92_","inPos":null,"exp":{"exps":[{"pid":"e93_","inPos":null,"exp":{"exps":[{"pid":"e94_","inPos":null,"exp":{"sident":"c0_Component","binding":"c0_Component","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Component"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"e95_","inPos":null,"exp":{"sident":"c0_performance","binding":"c0_performance","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_performance"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":"sum","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}],"op":"=>","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"total_energy","elements":[],"cinPos":null,"parentUID":"c0_MobilePhone","card":[1,1],"isAbstract":false,"uid":"c0_total_energy","gcard":{"interval":[0,-1],"isKeyword":false},"reference":{"isSet":false,"ref":{"pid":"","inPos":null,"exp":{"sident":"integer","binding":"integer","tag":"IClaferId","isTop":true,"modName":""}}}}},{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e96_","inPos":null,"exp":{"exps":[{"pid":"e97_","inPos":null,"exp":{"bpexp":{"pid":"e98_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_MobilePhone","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_MobilePhone"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_total_energy","binding":"c0_total_energy","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_total_energy"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_total_energy"]}},"oDecls":[],"quant":"ISome","tag":"IDeclPExp"},"iType":{"tag":"TBoolean","contents":[]}},{"pid":"e99_","inPos":null,"exp":{"exps":[{"pid":"e100_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_MobilePhone","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_MobilePhone"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_total_energy","binding":"c0_total_energy","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_total_energy"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e101_","inPos":null,"exp":{"exps":[{"pid":"e102_","inPos":null,"exp":{"exps":[{"pid":"e103_","inPos":null,"exp":{"sident":"c0_ComponentWithEnergy","binding":"c0_ComponentWithEnergy","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_ComponentWithEnergy"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"e104_","inPos":null,"exp":{"sident":"c0_energy","binding":"c0_energy","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_energy"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":"sum","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}],"op":"=>","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"root","card":[0,-1],"isAbstract":true,"uid":"c0_MobilePhone","gcard":{"interval":[0,-1],"isKeyword":false}}},{"tag":"IEClafer","iClafer":{"glCard":[1,1],"ident":"aPhone","elements":[],"cinPos":null,"parentUID":"root","card":[1,1],"isAbstract":false,"uid":"c0_aPhone","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_MobilePhone","binding":"c0_MobilePhone","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_MobilePhone"]}}}},{"isMaximize":true,"tag":"IEGoal","cpexp":{"pid":"e105_","inPos":null,"exp":{"exps":[{"pid":"e106_","inPos":null,"exp":{"exps":[{"pid":"e107_","inPos":null,"exp":{"sident":"c0_aPhone","binding":"c0_aPhone","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_aPhone"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"e108_","inPos":null,"exp":{"sident":"c0_total_energy","binding":"c0_total_energy","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_total_energy"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":"min","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}},{"isMaximize":true,"tag":"IEGoal","cpexp":{"pid":"e109_","inPos":null,"exp":{"exps":[{"pid":"e110_","inPos":null,"exp":{"exps":[{"pid":"e111_","inPos":null,"exp":{"sident":"c0_aPhone","binding":"c0_aPhone","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_aPhone"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"e112_","inPos":null,"exp":{"sident":"c0_total_performance","binding":"c0_total_performance","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_total_performance"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":"max","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}}]}
	},

	{
		name :'CruiseControl',
		json: {"mName":"","mDecls":[{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"Car","elements":[{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"ABS","elements":[],"cinPos":null,"parentUID":"c0_Car","card":[0,1],"isAbstract":false,"uid":"c0_ABS","gcard":{"interval":[0,-1],"isKeyword":false}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"CC","elements":[{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"ACC","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e0_","inPos":null,"exp":{"bpexp":{"pid":"e1_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_ACC","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_ACC"]}},{"pid":"","inPos":null,"exp":{"sident":"parent","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_CC"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_CC"]}},{"pid":"","inPos":null,"exp":{"sident":"parent","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Car"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_Car"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_FCA","binding":"c0_FCA","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_FCA"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_FCA"]}},"oDecls":[],"quant":"ISome","tag":"IDeclPExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"c0_CC","card":[0,1],"isAbstract":false,"uid":"c0_ACC","gcard":{"interval":[0,-1],"isKeyword":false}}}],"cinPos":null,"parentUID":"c0_Car","card":[0,1],"isAbstract":false,"uid":"c0_CC","gcard":{"interval":[0,-1],"isKeyword":false}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"Transmission","elements":[{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"Automatic","elements":[],"cinPos":null,"parentUID":"c0_Transmission","card":[0,1],"isAbstract":false,"uid":"c0_Automatic","gcard":{"interval":[0,-1],"isKeyword":false}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"Manual","elements":[],"cinPos":null,"parentUID":"c0_Transmission","card":[0,1],"isAbstract":false,"uid":"c0_Manual","gcard":{"interval":[0,-1],"isKeyword":false}}}],"cinPos":null,"parentUID":"c0_Car","card":[1,1],"isAbstract":false,"uid":"c0_Transmission","gcard":{"interval":[1,1],"isKeyword":true}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"FCA","elements":[{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"Sensor","elements":[{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"Radar","elements":[],"cinPos":null,"parentUID":"c0_Sensor","card":[0,1],"isAbstract":false,"uid":"c0_Radar","gcard":{"interval":[0,-1],"isKeyword":false}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"Lidar","elements":[],"cinPos":null,"parentUID":"c0_Sensor","card":[0,1],"isAbstract":false,"uid":"c0_Lidar","gcard":{"interval":[0,-1],"isKeyword":false}}}],"cinPos":null,"parentUID":"c0_FCA","card":[1,1],"isAbstract":false,"uid":"c0_Sensor","gcard":{"interval":[1,1],"isKeyword":true}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"Alert","elements":[{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"Haptic","elements":[],"cinPos":null,"parentUID":"c0_Alert","card":[0,1],"isAbstract":false,"uid":"c0_Haptic","gcard":{"interval":[0,-1],"isKeyword":false}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"Audible","elements":[],"cinPos":null,"parentUID":"c0_Alert","card":[0,1],"isAbstract":false,"uid":"c0_Audible","gcard":{"interval":[0,-1],"isKeyword":false}}}],"cinPos":null,"parentUID":"c0_FCA","card":[0,1],"isAbstract":false,"uid":"c0_Alert","gcard":{"interval":[1,1],"isKeyword":true}}}],"cinPos":null,"parentUID":"c0_Car","card":[0,1],"isAbstract":false,"uid":"c0_FCA","gcard":{"interval":[0,-1],"isKeyword":false}}}],"cinPos":null,"parentUID":"root","card":[0,-1],"isAbstract":true,"uid":"c0_Car","gcard":{"interval":[0,-1],"isKeyword":false}}},{"tag":"IEClafer","iClafer":{"glCard":[1,1],"ident":"aCar","elements":[],"cinPos":null,"parentUID":"root","card":[1,1],"isAbstract":false,"uid":"c0_aCar","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Car","binding":"c0_Car","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Car"]}}}}]}
	},

	{
		name: 'Allocation Example',
		json: {"mName":"","mDecls":[{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"Service","elements":[{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"requirements","elements":[],"cinPos":null,"parentUID":"c0_Service","card":[1,1],"isAbstract":false,"uid":"c0_requirements","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Requirements","binding":"c0_Requirements","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Requirements"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"machine","elements":[],"cinPos":null,"parentUID":"c0_Service","card":[1,1],"isAbstract":false,"uid":"c0_machine","gcard":{"interval":[0,-1],"isKeyword":false},"reference":{"isSet":true,"ref":{"pid":"","inPos":null,"exp":{"sident":"c0_Machine","binding":"c0_Machine","tag":"IClaferId","isTop":false,"modName":""}}}}},{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e0_","inPos":null,"exp":{"exps":[{"pid":"e1_","inPos":null,"exp":{"sident":"this","binding":"c0_Service","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Service"]}},{"pid":"e2_","inPos":null,"exp":{"exps":[{"pid":"e3_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_Service","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Service"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_machine","binding":"c0_machine","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_machine"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_machine"]}},{"pid":"e4_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"ref","binding":"c0_services","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Machine"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_services","binding":"c0_machine","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_services"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Service"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_Service"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_Service"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_Service"]}}],"op":"in","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"root","card":[0,-1],"isAbstract":true,"uid":"c0_Service","gcard":{"interval":[0,-1],"isKeyword":false}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"Requirements","elements":[{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"cpu","elements":[],"cinPos":null,"parentUID":"c0_Requirements","card":[1,1],"isAbstract":false,"uid":"c0_cpu","gcard":{"interval":[0,-1],"isKeyword":false},"reference":{"isSet":false,"ref":{"pid":"","inPos":null,"exp":{"sident":"integer","binding":"integer","tag":"IClaferId","isTop":true,"modName":""}}}}}],"cinPos":null,"parentUID":"root","card":[0,-1],"isAbstract":true,"uid":"c0_Requirements","gcard":{"interval":[0,-1],"isKeyword":false}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"Resources","elements":[],"cinPos":null,"parentUID":"root","card":[0,-1],"isAbstract":true,"uid":"c0_Resources","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Requirements","binding":"c0_Requirements","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Requirements"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"Machine","elements":[{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"services","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e5_","inPos":null,"exp":{"exps":[{"pid":"e6_","inPos":null,"exp":{"exps":[{"pid":"e7_","inPos":null,"exp":{"sident":"this","binding":"c0_services","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_services"]}},{"pid":"e8_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"ref","binding":"c0_machine","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Service"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_machine","binding":"c0_services","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_machine"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Machine"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_Machine"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_Machine"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_Machine"]}},{"pid":"e9_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_services","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_services"]}},{"pid":"","inPos":null,"exp":{"sident":"parent","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Machine"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_Machine"]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"c0_Machine","card":[0,-1],"isAbstract":false,"uid":"c0_services","gcard":{"interval":[0,-1],"isKeyword":false},"reference":{"isSet":true,"ref":{"pid":"","inPos":null,"exp":{"sident":"c0_Service","binding":"c0_Service","tag":"IClaferId","isTop":false,"modName":""}}}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"isFree","elements":[],"cinPos":null,"parentUID":"c0_Machine","card":[0,1],"isAbstract":false,"uid":"c0_isFree","gcard":{"interval":[0,-1],"isKeyword":false}}},{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e10_","inPos":null,"exp":{"exps":[{"pid":"e11_","inPos":null,"exp":{"bpexp":{"pid":"e12_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_Machine","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Machine"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_isFree","binding":"c0_isFree","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_isFree"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_isFree"]}},"oDecls":[],"quant":"ISome","tag":"IDeclPExp"},"iType":{"tag":"TBoolean","contents":[]}},{"pid":"e13_","inPos":null,"exp":{"bpexp":{"pid":"e14_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_Machine","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Machine"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_services","binding":"c0_services","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_services"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_services"]}},"oDecls":[],"quant":"INo","tag":"IDeclPExp"},"iType":{"tag":"TBoolean","contents":[]}}],"op":"<=>","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"limits","elements":[],"cinPos":null,"parentUID":"c0_Machine","card":[1,1],"isAbstract":false,"uid":"c0_limits","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Resources","binding":"c0_Resources","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Resources"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"utilization","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e15_","inPos":null,"exp":{"exps":[{"pid":"e16_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_utilization","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_utilization"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_cpu","binding":"c0_cpu","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_cpu"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e17_","inPos":null,"exp":{"exps":[{"pid":"e18_","inPos":null,"exp":{"exps":[{"pid":"e19_","inPos":null,"exp":{"exps":[{"pid":"e20_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_utilization","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_utilization"]}},{"pid":"","inPos":null,"exp":{"sident":"parent","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Machine"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_Machine"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_services","binding":"c0_services","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_services"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_services"]}},{"pid":"e21_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"ref","binding":"c0_requirements","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Service"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_requirements","binding":"c0_services","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_requirements"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_requirements"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_requirements"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"e22_","inPos":null,"exp":{"sident":"c0_cpu","binding":"c0_cpu","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_cpu"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":"sum","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}},{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e23_","inPos":null,"exp":{"exps":[{"pid":"e24_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_utilization","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_utilization"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_cpu","binding":"c0_cpu","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_cpu"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e25_","inPos":null,"exp":{"exps":[{"pid":"e26_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_utilization","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_utilization"]}},{"pid":"","inPos":null,"exp":{"sident":"parent","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Machine"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_Machine"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_limits","binding":"c0_limits","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_limits"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_limits"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"e27_","inPos":null,"exp":{"sident":"c0_cpu","binding":"c0_cpu","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_cpu"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":"<","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"c0_Machine","card":[1,1],"isAbstract":false,"uid":"c0_utilization","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Resources","binding":"c0_Resources","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Resources"]}}}}],"cinPos":null,"parentUID":"root","card":[0,-1],"isAbstract":true,"uid":"c0_Machine","gcard":{"interval":[0,-1],"isKeyword":false}}},{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"Task","elements":[{"tag":"IEClafer","iClafer":{"glCard":[0,-1],"ident":"total_free","elements":[],"cinPos":null,"parentUID":"c0_Task","card":[1,1],"isAbstract":false,"uid":"c0_total_free","gcard":{"interval":[0,-1],"isKeyword":false},"reference":{"isSet":true,"ref":{"pid":"","inPos":null,"exp":{"sident":"integer","binding":"integer","tag":"IClaferId","isTop":true,"modName":""}}}}},{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e28_","inPos":null,"exp":{"exps":[{"pid":"e29_","inPos":null,"exp":{"bpexp":{"pid":"e30_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_Task","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Task"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_total_free","binding":"c0_total_free","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_total_free"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_total_free"]}},"oDecls":[],"quant":"ISome","tag":"IDeclPExp"},"iType":{"tag":"TBoolean","contents":[]}},{"pid":"e31_","inPos":null,"exp":{"exps":[{"pid":"e32_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_Task","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Task"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"c0_total_free","binding":"c0_total_free","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_total_free"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e33_","inPos":null,"exp":{"exps":[{"pid":"e34_","inPos":null,"exp":{"exps":[{"pid":"e35_","inPos":null,"exp":{"sident":"c0_Machine","binding":"c0_Machine","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Machine"]}},{"pid":"e36_","inPos":null,"exp":{"sident":"c0_isFree","binding":"c0_isFree","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_isFree"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_isFree"]}}],"op":"#","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}],"op":"=>","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"root","card":[0,-1],"isAbstract":true,"uid":"c0_Task","gcard":{"interval":[0,-1],"isKeyword":false}}},{"tag":"IEClafer","iClafer":{"glCard":[1,1],"ident":"MyTask","elements":[{"tag":"IEClafer","iClafer":{"glCard":[1,1],"ident":"GoogleCA","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e37_","inPos":null,"exp":{"exps":[{"pid":"e38_","inPos":null,"exp":{"exps":[{"pid":"e39_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_GoogleCA","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_GoogleCA"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_limits","binding":"c0_limits","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_limits"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_limits"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"e40_","inPos":null,"exp":{"sident":"c0_cpu","binding":"c0_cpu","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_cpu"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e41_","inPos":null,"exp":{"iint":10,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"c0_MyTask","card":[1,1],"isAbstract":false,"uid":"c0_GoogleCA","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Machine","binding":"c0_Machine","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Machine"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[1,1],"ident":"GoogleNY","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e42_","inPos":null,"exp":{"exps":[{"pid":"e43_","inPos":null,"exp":{"exps":[{"pid":"e44_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_GoogleNY","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_GoogleNY"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_limits","binding":"c0_limits","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_limits"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_limits"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"e45_","inPos":null,"exp":{"sident":"c0_cpu","binding":"c0_cpu","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_cpu"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e46_","inPos":null,"exp":{"iint":16,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"c0_MyTask","card":[1,1],"isAbstract":false,"uid":"c0_GoogleNY","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Machine","binding":"c0_Machine","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Machine"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[1,1],"ident":"GoogleTX","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e47_","inPos":null,"exp":{"exps":[{"pid":"e48_","inPos":null,"exp":{"exps":[{"pid":"e49_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_GoogleTX","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_GoogleTX"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_limits","binding":"c0_limits","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_limits"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_limits"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"e50_","inPos":null,"exp":{"sident":"c0_cpu","binding":"c0_cpu","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_cpu"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e51_","inPos":null,"exp":{"iint":14,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"c0_MyTask","card":[1,1],"isAbstract":false,"uid":"c0_GoogleTX","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Machine","binding":"c0_Machine","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Machine"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[1,1],"ident":"MailService","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e52_","inPos":null,"exp":{"exps":[{"pid":"e53_","inPos":null,"exp":{"exps":[{"pid":"e54_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_MailService","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_MailService"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_requirements","binding":"c0_requirements","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_requirements"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_requirements"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"e55_","inPos":null,"exp":{"sident":"c0_cpu","binding":"c0_cpu","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_cpu"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e56_","inPos":null,"exp":{"iint":4,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"c0_MyTask","card":[1,1],"isAbstract":false,"uid":"c0_MailService","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Service","binding":"c0_Service","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Service"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[1,1],"ident":"SearchService","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e57_","inPos":null,"exp":{"exps":[{"pid":"e58_","inPos":null,"exp":{"exps":[{"pid":"e59_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_SearchService","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_SearchService"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_requirements","binding":"c0_requirements","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_requirements"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_requirements"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"e60_","inPos":null,"exp":{"sident":"c0_cpu","binding":"c0_cpu","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_cpu"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e61_","inPos":null,"exp":{"iint":3,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"c0_MyTask","card":[1,1],"isAbstract":false,"uid":"c0_SearchService","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Service","binding":"c0_Service","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Service"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[1,1],"ident":"CalendarService","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e62_","inPos":null,"exp":{"exps":[{"pid":"e63_","inPos":null,"exp":{"exps":[{"pid":"e64_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_CalendarService","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_CalendarService"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_requirements","binding":"c0_requirements","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_requirements"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_requirements"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"e65_","inPos":null,"exp":{"sident":"c0_cpu","binding":"c0_cpu","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_cpu"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e66_","inPos":null,"exp":{"iint":1,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"c0_MyTask","card":[1,1],"isAbstract":false,"uid":"c0_CalendarService","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Service","binding":"c0_Service","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Service"]}}}},{"tag":"IEClafer","iClafer":{"glCard":[1,1],"ident":"DriveService","elements":[{"tag":"IEConstraint","isHard":true,"cpexp":{"pid":"e67_","inPos":null,"exp":{"exps":[{"pid":"e68_","inPos":null,"exp":{"exps":[{"pid":"e69_","inPos":null,"exp":{"exps":[{"pid":"","inPos":null,"exp":{"sident":"this","binding":"c0_DriveService","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_DriveService"]}},{"pid":"","inPos":null,"exp":{"sident":"c0_requirements","binding":"c0_requirements","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_requirements"]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TClafer","contents":["c0_requirements"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"e70_","inPos":null,"exp":{"sident":"c0_cpu","binding":"c0_cpu","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_cpu"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}},{"pid":"e71_","inPos":null,"exp":{"iint":2,"tag":"IInt"},"iType":{"tag":"TInteger","contents":[]}}],"op":"=","tag":"IFunExp"},"iType":{"tag":"TBoolean","contents":[]}}}],"cinPos":null,"parentUID":"c0_MyTask","card":[1,1],"isAbstract":false,"uid":"c0_DriveService","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Service","binding":"c0_Service","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Service"]}}}}],"cinPos":null,"parentUID":"root","card":[1,1],"isAbstract":false,"uid":"c0_MyTask","gcard":{"interval":[0,-1],"isKeyword":false},"super":{"pid":"","inPos":null,"exp":{"sident":"c0_Task","binding":"c0_Task","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_Task"]}}}},{"isMaximize":true,"tag":"IEGoal","cpexp":{"pid":"e72_","inPos":null,"exp":{"exps":[{"pid":"e73_","inPos":null,"exp":{"exps":[{"pid":"e74_","inPos":null,"exp":{"sident":"c0_MyTask","binding":"c0_MyTask","tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TClafer","contents":["c0_MyTask"]}},{"pid":"","inPos":null,"exp":{"exps":[{"pid":"e75_","inPos":null,"exp":{"sident":"c0_total_free","binding":"c0_total_free","tag":"IClaferId","isTop":false,"modName":""},"iType":{"tag":"TClafer","contents":["c0_total_free"]}},{"pid":"","inPos":null,"exp":{"sident":"ref","binding":null,"tag":"IClaferId","isTop":true,"modName":""},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":".","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}],"op":"max","tag":"IFunExp"},"iType":{"tag":"TInteger","contents":[]}}}]}

	}

]