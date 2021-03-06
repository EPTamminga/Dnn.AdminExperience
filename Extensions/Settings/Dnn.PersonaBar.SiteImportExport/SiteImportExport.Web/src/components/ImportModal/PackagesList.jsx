import React, { PropTypes, Component } from "react";
import { connect } from "react-redux";
import Localization from "localization";
import PackageCard from "./PackageCard";
import Tooltip from "dnn-tooltip";
import PackageCardOverlay from "./PackageCardOverlay";
import {
    CheckMarkIcon
} from "dnn-svg-icons";

const tooltipStyle = {
    style: {
        background: "#fff",
        color: "white",
        padding: "10px 20px",
        transition: "opacity 0.2s ease-in-out, visibility 0.2s ease-in-out",
        boxShadow: "0 0 10px 1px #C8C8C8",
        maxWidth: 500,
        fontFamily: "'proxima_nova', 'HelveticaNeue', 'Helvetica Neue', Helvetica, Arial, sans-serif",
        zIndex: 9999
    },
    arrowStyle: {
        color: "#fff",
        borderColor: "#C8C8C8"
    }
};

class PackagesList extends Component {
    onSelect(pkg) {
        this.props.selectPackage(pkg);
    }

    renderTooltipMessage(description) {
        if (description) {
            return (
                "<div><div style='text-transform: uppercase;font-weight: 700;padding: 20px 20px 15px 20px;color: #000'>" +
                Localization.get("PackageDescription") +
                "</div><div style='color: #4b4e4f;padding: 0 20px 20px 20px;'>" +
                description +
                "</div></div>"
            );
        }
        else return;
    }

    /* eslint-disable react/no-danger */
    render() {
        const { props } = this;
        if (props.importPackages && props.importPackages.length > 0) {
            return <div className="package-cards">
                {props.importPackages.map((pkg) => {
                    return <div className="package-card-wrapper">
                        <PackageCard selectedPackage={pkg}
                            className={(props.selectedPackage && props.selectedPackage.PackageId === pkg.PackageId) ? "package-card selected" : "package-card"}>
                            <PackageCardOverlay
                                selectPackage={this.onSelect.bind(this, pkg)}
                                packageName={pkg.Name}
                                packageDescription={pkg.Description}
                                isSelected={props.selectedPackage && props.selectedPackage.PackageId === pkg.PackageId} />
                            {props.selectedPackage && props.selectedPackage.PackageId === pkg.PackageId &&
                                <div className="checkmark" dangerouslySetInnerHTML={{ __html: CheckMarkIcon }}></div>
                            }
                            <Tooltip
                                tooltipStyle={tooltipStyle}
                                onClick={this.onSelect.bind(this, pkg)}
                                messages={[this.renderTooltipMessage(pkg.Description)]}
                                tooltipPlace="bottom"
                            />
                        </PackageCard>
                    </div>;
                })}
            </div>;
        }
        else return <div className="noPackages">{Localization.get("NoPackages")}</div>;
    }
}

PackagesList.propTypes = {
    dispatch: PropTypes.func.isRequired,
    importPackages: PropTypes.array,
    selectedPackage: PropTypes.object,
    selectPackage: PropTypes.func
};

function mapStateToProps(state) {
    return {
        importPackages: state.importExport.importPackages,
        selectedPackage: state.importExport.selectedPackage
    };
}

export default connect(mapStateToProps)(PackagesList);