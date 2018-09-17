import sys
import json
def applicationExists():
    exists = False
    inputValue = sys.argv[1]
    jsonData = sys.argv[2]
    print 'jsonData:' + jsonData
  
    
    j = json.loads(jsonData)
    
    for application in j['applications']:
        if inputValue == application:
            exists = True

    

    return str(exists)


if __name__ == '__main__':
    sys.stdout.write(applicationExists())

    
    

    
