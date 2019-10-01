Steps to build it:
==

- Download https://github.com/joefitzgerald/packer-windows
- Edit files

    1- comment `:: cmd /c C:\Windows\Temp\sdelete.exe -q -z C:` 
    on `packer-windows-master/scripts/compact.bat`
    
    2- change `"ssh_wait_timeout": "2h",` 
    to `"ssh_wait_timeout": "8h",` 
    in packer-windows-master/windows_10.json
    
    
    
- Build the image


    packer build windows_10.json

- Make the box and create `Vagrantfile` file


    vagrant box add win-10 window.box
    vagrant init  win-10

- Run it at any time


    vagrant up
    vagrant halt
