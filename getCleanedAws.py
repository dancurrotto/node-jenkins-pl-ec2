import sys
def cleanAws():
    inputValue =  sys.argv[1]
    cleaned = inputValue.replace('"','').replace('\\','')
    f = open("cleanedAwsValue", "w")
    f.write(str(cleaned))
    f.close
    return str(cleaned)

if __name__ == '__main__':
    sys.stdout.write(cleanAws())