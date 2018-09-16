import sys
def cleanAws():
    inputValue =  sys.argv[1]
    return inputValue.replace('"','').replace('\\','')


if __name__ == '__main__':
    sys.stdout.write(cleanAws())

    
    
