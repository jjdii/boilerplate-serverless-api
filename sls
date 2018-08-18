#bash/bin

case $1 in

  setup)
    read -p "AWS_ACCESS_KEY: " accessKey
    read -p "AWS_SECRET_ACCESS_KEY: " secretKey
    export AWS_ACCESS_KEY_ID=$accessKey
    export AWS_SECRET_ACCESS_KEY=#secretKey

    cd endpoints
    dirs=`ls -d */`
    for dir in $dirs; do
    cd $dir
    npm install
    cd ..
    done
    cd ..

    echo "Setup done"
    ;;

  deploy)
    if [[ $2 == "all" ]]; then
      if [[ -n "$3" ]]; then
        cd endpoints
        dirs=`ls -d */`
        for dir in $dirs; do
        cd $dir
        sls deploy --stage $3
        cd ..
        done
        cd ..

        echo "Successfully deployed all endpoints ["$dirs"]"
        echo -en "\007"
      else
        cd endpoints
        dirs=`ls -d */`
        for dir in $dirs; do
        cd $dir
        sls deploy
        cd ..
        done
        cd ..

        echo "Successfully deployed all endpoints ["$dirs"]"
        echo -en "\007"
      fi
    elif [[ -n "$2" ]]; then
      if [[ -n "$3" ]]; then
        cd endpoints/$2
        sls deploy --stage $3
        cd ../..

        echo "Successfully deployed "$2" endpoint"
        echo -en "\007"
      else
        cd endpoints/$2
        sls deploy
        cd ../..

        echo "Successfully deployed "$2" endpoint"
        echo -en "\007"
      fi
    else
      echo "Not a valid 'deploy' action. Options: [all, (endpoint_name)]"
    fi
    ;;

  remove)
    if [[ $2 == "all" ]]; then
      if [[ -n "$3" ]]; then
        cd endpoints
        dirs=`ls -d */`
        for dir in $dirs; do
        cd $dir
        sls remove --stage $3
        cd ..
        done
        cd ..

        echo "Successfully removed all endpoints ["$dirs"]"
      else
        cd endpoints
        dirs=`ls -d */`
        for dir in $dirs; do
        cd $dir
        sls remove
        cd ..
        done
        cd ..

        echo "Successfully removed all endpoints ["$dirs"]"
      fi
    elif [[ -n "$2" ]]; then
      if [[ -n "$3" ]]; then
        cd endpoints/$2
        sls remove --stage $3
        cd ../..

        echo "Successfully removed "$2" endpoint"
      else
        cd endpoints/$2
        sls remove
        cd ../..

        echo "Successfully removed "$2" endpoint"
      fi
    else
      echo "Not a valid 'remove' action. Options: [all, (endpoint_name)]"
    fi
    ;;

  npm)
    if [[ $2 == "install" ]]; then
      if [[ $3 == "all" ]]; then
        cd endpoints
        dirs=`ls -d */`
        for dir in $dirs; do
        cd $dir
        npm install
        cd ..
        done
        cd ..

        echo "Successfully npm installed all endpoints ["$dirs"]"
      elif [[ -n "$3" ]]; then
        cd endpoints/$3
        npm install
        cd ../..

        echo "Successfully npm installed "$3" endpoint"
      else
        echo "Not a valid 'npm install' action. Options: [all, (endpoint_name)]"
      fi
    elif [[ $2 == "addto" ]]; then
      if [[ $3 == "all" ]]; then
        if [[ -n "$4" ]]; then
          cd endpoints
          dirs=`ls -d */`
          for dir in $dirs; do
          cd $dir
          npm install $4
          cd ..
          done
          cd ..

          echo "Successfully npm installed package "$4" to all endpoints ["$dirs"]"
        else
          echo "Not a valid 'npm addto all' action. Options: [(package_name)]"
        fi
      elif [[ -n "$3" ]]; then
        if [[ -n "$4" ]]; then
          cd endpoints/$3
          npm install $4
          cd ../..

          echo "Successfully npm installed package "$4" to "$3" endpoint"
        else
          echo "Not a valid 'npm addto $3' action. Options: [(package_name)]"
        fi
      else
        echo "Not a valid 'npm addto' action. Options: [all, (endpoint_name)]"
      fi
    elif [[ $2 == "remove" ]]; then
      if [[ $3 == "all" ]]; then
        if [[ -n "$4" ]]; then
          cd endpoints
          dirs=`ls -d */`
          for dir in $dirs; do
          cd $dir
          npm uninstall $4
          cd ..
          done
          cd ..

          echo "Successfully npm uninstalled package "$4" on all endpoints ["$dirs"]"
        else
          echo "Not a valid 'npm remove all' action. Options: [(package_name)]"
        fi
      elif [[ -n "$3" ]]; then
        if [[ -n "$4" ]]; then
          cd endpoints/$3
          npm uninstall $4
          cd ../..

          echo "Successfully npm uninstalled package "$4" on "$3" endpoint"
        else
          echo "Not a valid 'npm remove $3' action. Options: [(package_name)]"
        fi
      else
        echo "Not a valid 'npm remove' action. Options: [all, (endpoint_name)]"
      fi
    else
      echo "Not a valid 'npm' action. Options: [install, addto, remove]"
    fi
    ;;

  *)
    echo "Not a valid action. Options: [setup, npm, test, deploy, remove]"
    ;;

esac