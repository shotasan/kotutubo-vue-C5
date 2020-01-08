def length():
    return list(range(1, 5))


def cal():
    result = []
    map(lambda n: result.append(double(n)), length())
    map(lambda m: m.insert(0, m[0]), result)
    top(result)
    return result


def double(n):
    return map(lambda m: n * m, length())


def top(result):
    top_line = length()
    top_line.insert(0, ' ')
    result.insert(0, top_line)


# print(cal())
for name in cal():
    print(name.join)
