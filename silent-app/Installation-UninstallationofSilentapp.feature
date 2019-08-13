#
# Feature: Installation-Uninstallation of Silent app 
#
# Created with BDD Editor on: 13 August, 2019
#
# Please follow us at @bddeditor AND if you find this tool useful please share with friends and colleagues!
#

@Installation-uninstallation 
Feature: Installation-Uninstallation of Silent app 

  @Installation 
  Scenario: 1 Test installation of silent app
    Given Silent app should be downloaded from download page
    When User clicks on downloaded file
    Then Silent app should get installed
    And Time tracking should start after installation

  @Installation 
  Scenario: 2 Test the app is installed and sfproc process is running
    Given Silent app should be installed
    When User go to command prompt
    And add command - wmic process where name="sfproc.exe"
    Then Command prompt will show - No instance(s) available

  @Installation 
  Scenario: 3 Test the app is installed and sfproc process is running
    Given Silent app should be installed
    When User go to command prompt
    And add command - tasklist /fi "Imagename eq sfproc.exe"
    Then Command prompt will show - INFO: No tasks are running which match the specified criteria 

  @Installation 
  Scenario: 4 Test the app is installed and staffservice process is running
    Given Silent app should be installed
    When User go to command prompt
    And add command - wmic process where name="staffservice.exe"
    Then Command prompt will show - No instance(s) available

  @Installation 
  Scenario: 5 Test the app is installed and staffservice process is running
    Given Silent app should be installed
    When User go to command prompt
    And add command - tasklist /fi "Imagename eq staffservice.exe"
    Then Command prompt will show - INFO: No tasks are running which match the specified criteria 

  @Uninstall 
  Scenario: 6 Test Uninstallation of silent app
    Given Silent app should be installed
    When User right click on downloaded app file
    And User click on uninstall option
    Then App gets uninstalled 
    And User can go to command prompt
    And Check command - wmic product where "name = 'SFProc App'"
