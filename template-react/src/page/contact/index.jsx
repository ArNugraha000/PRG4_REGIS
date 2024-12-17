import React from "react";
import PageTitle from "../../component/PageTitle";
import Loading from "../../component/part/Loading";

const Contact = () => {
  const whatsappLinks = [
    { department: "Marketing", number: "081380608739", link: "https://wa.me/6281380608739" },
    { department: "Dakap", number: "085955235699", link: "https://wa.me/60185955235699" },
  ];

  const buttonStyle = {
    backgroundColor: '#0059ab',
    borderColor: '#0059ab',
    color: '#fff',
    width: '300px',
    height: '50px',
    fontSize: '18px',
    margin: '10px'
  };

  return (
    <PageTitle title="CONTACT US" backgroundImage="background3">
      <div className="container px-5 pb-5">
        <div className="row">
          <div className="col-lg-8 col-xl-6 text-center mx-auto">
            <h1 className="mb-4">We're here to help!</h1>
            <div>
              <a
                href={whatsappLinks[0].link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={buttonStyle}
              >
                Contact Marketing
              </a>
            </div>
            <div>
              <a
                href={whatsappLinks[1].link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={buttonStyle}
              >
                Contact Dakap
              </a>
            </div>
          </div>
        </div>
      </div>
    </PageTitle>
  );
};

export default Contact;
