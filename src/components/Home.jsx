import {useEffect} from "react";

function Home() {
  useEffect(() => {
    const webSdkPaymentForm = new window.PaymentForm({
      mdOrder: "7d6485a1-6728-7de1-861c-7e5f07d96e3b",
      // Name of the className that will be set for containers with frames
      containerClassName: 'field-container',
      onFormValidate: (isValid) => {
        // Handling form validation
      },
      // Context for API queries
      apiContext: "/payment",
      // Language - is used for localization of errors and placeholder names.
      // The language must be supported in Merchant settings
      language: "en",
      // Automatically shift focus as fields are filled out
      autoFocus: true,
      // Show payment system icon
      showPanIcon: true,

      // Custom styles for payment system icon
      panIconStyle: {
        height: "16px",
        top: "calc(50% - 8px)",
        right: "8px",
      },
      fields: {
        pan: {
          container: document.querySelector("#pan"),
          onFocus: (containerElement) => {
            // Action when field gets focus
            // (containerElement contains link to field container element)
          },
          onBlur: (containerElement) => {
            // Action when field gets focus off it
            // (containerElement contains link to field container element)
          },
          onValidate: (isValid, containerElement) => {
            // Action when field is valid
            // (isValid is true if field is valid, otherwise is false)
            // (containerElement contains link to field container element)
          },
        },
        expiry: {
          container: document.querySelector("#expiry"),
          // ...
        },
        cvc: {
          container: document.querySelector("#cvc"),
          // ...
        },
      },
      // Style for input fields
      styles: {
        // Base state
        base: {
          color: "black",
          fontSize: "18px",
        },
        // Focused state
        focus: {
          color: "blue",
        },
        // Disabled state
        disabled: {
          color: "gray",
        },
        // Has valid value
        valid: {
          color: "green",
        },
        // Has invalid value
        invalid: {
          color: "red",
        },
        // Style for placeholder
        placeholder: {
          // Base style
          base: {
            color: "gray",
          },
          // Style when focused
          focus: {
            color: "transparent",
          },
        },
      },
    });

    webSdkPaymentForm
        .init()
        .then(() => {
          // initSuccessfull();
        })
        .catch(() => {
          // initError();
        });

    document.querySelector('#pay').addEventListener('click', () => {
      const payButton = document.querySelector('#pay');
      payButton.disabled = true;

      webSdkPaymentForm
          .doPayment({})
          .then((result) => {
            //
          })
          .catch((e) => {
            alert('Error')
          })
          .finally(() => {
            payButton.disabled = false;
          });
    });

    return () => {
      webSdkPaymentForm.destroy();
    }
  }, [])

  return (
    <div className="home">
      <div className="container">
        <div className="row  my-5">
          <div className="col-lg-5 title">
            <h1 className="font-weight-light">Page №1</h1>
            <h4>Page with WebSDK Form</h4>
            <p>It is necessary to initialize the Web SDK by executing the <b>webSdkPaymentForm.init()</b> method on each initial render of the page with the Web SDK form in our SPA.</p>
            <p>On the event of resetting the page with Web SDK form (i.e. when switching to another page), it is necessary to execute the <b>webSdkPaymentForm.destroy()</b> method. This is important, because only one webSDK form handler (multiframe-commutator) should remain on the page.</p>
            <p>When returning to the page with the Web SDK form, as already mentioned, it is necessary to perform initialization again using <b>webSdkPaymentForm.init()</b> method.</p>
          </div>
          <div className="websdk-form">
            <div className="card-body">
              <div className="col-12 input-form">
                <label htmlFor="pan" className="form-label">
                  Card number
                </label>
              <div id="pan" className="form-control"></div>
              </div>
              <div className="col-6 col-expiry input-form">
                <label htmlFor="expiry" className="form-label">
                  Expiry
                </label>
                <div id="expiry" className="form-control"></div>
              </div>
              <div className="col-6 col-cvc">
                <label htmlFor="cvc" className="form-label">
                  CVC / CVV
                </label>
                <div id="cvc" className="form-control"></div>
              </div>
            </div>
            <div className="pay-control">
              <button className="btn btn-primary btn-lg" type="submit" id="pay">
                Pay
              </button>
            </div>
            <div
                className="error my-2 text-center text-danger visually-hidden"
                id="error"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
