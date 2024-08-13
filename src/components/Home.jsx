import {useEffect} from "react";

function Home() {
  useEffect(() => {
    let webSdkPaymentForm = new window.PaymentForm({
      mdOrder: "18708e18-b606-7baa-9061-ead507ab809b",
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
        .then(({orderSession}) => {
                      // orderSession contains all information about order (it includes info about bindings)
                      console.info('orderSession', orderSession);

                      // Show select binding element
                      document.querySelector('#select-binding-container').style.display = orderSession.bindings.length
                        ? ''
                        : 'none';
          
                      // Show save card checkbox
                      document.querySelector('#save-card-container').style.display = orderSession.bindingEnabled ? '' : 'none';
          
                      // Fill select with bindings
                      orderSession.bindings.forEach((binding) => {
                        document.querySelector('#select-binding').options.add(new Option(binding.pan, binding.id));
                      });
          
                      // Handle select binding/new-card
                      document.querySelector('#select-binding').addEventListener('change', function () {
                        const bindingId = this.value;
                        if (bindingId !== 'new_card') {
                          webSdkPaymentForm.selectBinding(bindingId);
          
                          // hide save card checkbox
                          document.querySelector('#save-card-container').style.display = 'none';
                        } else {
                          // selectBinding with null means switch to new-card
                          webSdkPaymentForm.selectBinding(null);
          
                          // show save card checkbox
                          document.querySelector('#save-card-container').style.display = '';
                        }
                      });
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
              <div className="col-12" id="select-binding-container" style={{display: "none"}}>
                <select className="form-select" id="select-binding" aria-label="Default select example">
                  <option value="new_card">Pay by new card</option>
                </select>
              </div>
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
              <label className="col-12" id="save-card-container">
                <input className="form-check-input me-1" type="checkbox" value="" id="save-card" />
                Save card
              </label>
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
