"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCertificate = void 0;
const aws_certificatemanager_1 = require("aws-cdk-lib/aws-certificatemanager");
const createCertificate = (props) => {
    const { scope, hostedZone, url } = props;
    return new aws_certificatemanager_1.DnsValidatedCertificate(scope, 'certificate', {
        domainName: url,
        hostedZone,
        region: 'us-east-1',
        cleanupRoute53Records: true
    });
};
exports.createCertificate = createCertificate;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSwrRUFBeUY7QUFRbEYsTUFBTSxpQkFBaUIsR0FBRyxDQUFDLEtBQTZCLEVBQWdCLEVBQUU7SUFDL0UsTUFBTSxFQUFDLEtBQUssRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFDLEdBQUcsS0FBSyxDQUFBO0lBRXRDLE9BQU8sSUFBSSxnREFBdUIsQ0FBQyxLQUFLLEVBQUUsYUFBYSxFQUFFO1FBQ3ZELFVBQVUsRUFBRSxHQUFHO1FBQ2YsVUFBVTtRQUNWLE1BQU0sRUFBRSxXQUFXO1FBQ25CLHFCQUFxQixFQUFFLElBQUk7S0FDNUIsQ0FBQyxDQUFBO0FBQ0osQ0FBQyxDQUFBO0FBVFksUUFBQSxpQkFBaUIscUJBUzdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtTdGFja30gZnJvbSBcImF3cy1jZGstbGliXCI7XHJpbXBvcnQge0lIb3N0ZWRab25lfSBmcm9tIFwiYXdzLWNkay1saWIvYXdzLXJvdXRlNTNcIjtccmltcG9ydCB7RG5zVmFsaWRhdGVkQ2VydGlmaWNhdGUsIElDZXJ0aWZpY2F0ZX0gZnJvbSBcImF3cy1jZGstbGliL2F3cy1jZXJ0aWZpY2F0ZW1hbmFnZXJcIjtcclxyZXhwb3J0IGludGVyZmFjZSBDcmVhdGVDZXJ0aWZpY2F0ZVByb3BzIHtcciAgc2NvcGU6IFN0YWNrO1xyICBob3N0ZWRab25lOiBJSG9zdGVkWm9uZTtcciAgdXJsOiBzdHJpbmc7XHJ9XHJccmV4cG9ydCBjb25zdCBjcmVhdGVDZXJ0aWZpY2F0ZSA9IChwcm9wczogQ3JlYXRlQ2VydGlmaWNhdGVQcm9wcyk6IElDZXJ0aWZpY2F0ZSA9PiB7XHIgIGNvbnN0IHtzY29wZSwgaG9zdGVkWm9uZSwgdXJsfSA9IHByb3BzXHJcciAgcmV0dXJuIG5ldyBEbnNWYWxpZGF0ZWRDZXJ0aWZpY2F0ZShzY29wZSwgJ2NlcnRpZmljYXRlJywge1xyICAgIGRvbWFpbk5hbWU6IHVybCxcciAgICBob3N0ZWRab25lLFxyICAgIHJlZ2lvbjogJ3VzLWVhc3QtMScsXHIgICAgY2xlYW51cFJvdXRlNTNSZWNvcmRzOiB0cnVlXHIgIH0pXHJ9XHIiXX0=