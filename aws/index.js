// var AWS = require('aws-sdk');

// workspaces.associateIpGroups(params, function (err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log(data);           // successful response
// });


/*
 * Copyright 2013. Amazon Web Services, Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
**/

// Load the SDK and UUID
var AWS = require('aws-sdk');
// var uuid = require('node-uuid');

// Create an S3 client
var s3 = new AWS.S3();
var workspaces = new AWS.WorkSpaces();

// Create a bucket and upload something into it
// var bucketName = 'node-sdk-sample-' + uuid.v4();
var keyName = 'hello_world.txt';
// var params = {
//     ResourceIds: [ /* required */
//         'STRING_VALUE',
//         /* more items */
//     ]
// };
// workspaces.describeClientProperties(params, function(err, data) {
//     if (err) console.log(err, err.stack); // an error occurred
//     else     console.log(data);           // successful response
// });

console.log(workspaces);
// s3.createBucket({Bucket: bucketName}, function() {
//     var params = {Bucket: bucketName, Key: keyName, Body: 'Hello World!'};
//     s3.putObject(params, function(err, data) {
//         if (err)
//             console.log(err)
//         else
//             console.log("Successfully uploaded data to " + bucketName + "/" + keyName);
//     });
// });

var params = {
    Workspaces: [ /* required */
        {
            BundleId: 'STRING_VALUE', /* required */
            DirectoryId: 'STRING_VALUE', /* required */
            UserName: 'STRING_VALUE', /* required */
            RootVolumeEncryptionEnabled: true || false,
            Tags: [
                {
                    Key: 'STRING_VALUE', /* required */
                    Value: 'STRING_VALUE'
                },
                /* more items */
            ],
            // UserVolumeEncryptionEnabled: true || false,
            // VolumeEncryptionKey: 'STRING_VALUE',
            // WorkspaceProperties: {
            //     ComputeTypeName: VALUE | STANDARD | PERFORMANCE | POWER | GRAPHICS | POWERPRO | GRAPHICSPRO,
            //     RootVolumeSizeGib: 'NUMBER_VALUE',
            //     RunningMode: AUTO_STOP | ALWAYS_ON,
            //     RunningModeAutoStopTimeoutInMinutes: 'NUMBER_VALUE',
            //     UserVolumeSizeGib: 'NUMBER_VALUE'
            // }
        },
        /* more items */
    ]
};
workspaces.createWorkspaces(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
});